import React, { createContext, useContext, useMemo, useState } from "react";

const AGCtx = createContext(null);

function toNum(s) {
  const v = String(s ?? "").trim().replace(",", ".");
  if (v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function AnionGapProvider({ children }) {
  const [na, setNa] = useState("");
  const [k, setK] = useState("");
  const [hco3, setHco3] = useState("");
  const [cl, setCl] = useState("");

  const values = useMemo(() => {
    const naV = toNum(na);
    const kV = toNum(k);
    const hV = toNum(hco3);
    const clV = toNum(cl);

    const canAG =
      naV !== null && kV !== null && hV !== null && clV !== null;

    const ag = canAG ? (naV + kV) - (hV + clV) : null;

    return {
      na, setNa,
      k, setK,
      hco3, setHco3,
      cl, setCl,
      ag,
      h: hV, // HCO3- als Zahl (für Delta)
    };
  }, [na, k, hco3, cl]);

  return <AGCtx.Provider value={values}>{children}</AGCtx.Provider>;
}

function useAG() {
  const ctx = useContext(AGCtx);
  if (!ctx) {
    throw new Error("AnionGapProvider fehlt: Bitte alles in <AnionGapProvider> ... </AnionGapProvider> wrappen.");
  }
  return ctx;
}

/** Inputs + AG-Ausgabe (inline, ohne Labels) */
export function AnionGapInline({ decimals = 1, w = 60 }) {
  const { na, setNa, k, setK, hco3, setHco3, cl, setCl, ag } = useAG();

  const style = {
    width: w,
    padding: "2px 6px",
    margin: "0 4px",
    verticalAlign: "baseline",
  };
  const outStyle = { ...style, background: "rgba(0,0,0,0.06)" };

  const agStr = ag === null ? "" : ag.toFixed(decimals);

  return (
    <span style={{ whiteSpace: "nowrap" }}>
      <input type="number" inputMode="decimal" value={na} onChange={(e) => setNa(e.target.value)} style={style} placeholder="Na+" />
      <input type="number" inputMode="decimal" value={k} onChange={(e) => setK(e.target.value)} style={style} placeholder="K+" />
      <input type="number" inputMode="decimal" value={hco3} onChange={(e) => setHco3(e.target.value)} style={style} placeholder="HCO₃⁻" />
      <input type="number" inputMode="decimal" value={cl} onChange={(e) => setCl(e.target.value)} style={style} placeholder="Cl⁻" />
      →
      <input type="text" readOnly value={agStr} style={outStyle} />
    </span>
  );
}

/** Nur Delta-Lücke als Ausgabe (inline, ohne Labels, übernimmt AG + HCO3 automatisch) */
export function DeltaGapOutput({ decimals = 2, w = 60 }) {
  const { ag, h } = useAG();

  const style = {
    width: w,
    padding: "2px 6px",
    margin: "0 4px",
    verticalAlign: "baseline",
  };
  const outStyle = { ...style, background: "rgba(0,0,0,0.06)" };

  let out = "";
  if (ag !== null && h !== null) {
    const denom = 24 - h;
    if (denom !== 0) {
      const delta = (ag - 11) / denom;
      if (Number.isFinite(delta)) out = delta.toFixed(decimals);
    }
  }

  return (
    <span style={{ whiteSpace: "nowrap" }}>
      <input type="text" readOnly value={out} style={outStyle} />
    </span>
  );
}