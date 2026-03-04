import React, { useMemo, useState } from "react";

export default function AnionGapInline({
  decimals = 1,
  w = 60,
}) {
  const [na, setNa] = useState("");
  const [k, setK] = useState("");
  const [hco3, setHco3] = useState("");
  const [cl, setCl] = useState("");

  const result = useMemo(() => {
    const naV = Number(na.replace(",", "."));
    const kV = Number(k.replace(",", "."));
    const hV = Number(hco3.replace(",", "."));
    const clV = Number(cl.replace(",", "."));

    if (
      !Number.isFinite(naV) ||
      !Number.isFinite(kV) ||
      !Number.isFinite(hV) ||
      !Number.isFinite(clV)
    ) {
      return "";
    }

    const gap = (naV + kV) - (hV + clV);

    return gap.toFixed(decimals);
  }, [na, k, hco3, cl, decimals]);

  const style = {
    width: w,
    padding: "2px 6px",
    margin: "0 4px",
    verticalAlign: "baseline",
  };

  const outStyle = {
    ...style,
    background: "rgba(0,0,0,0.06)",
  };

  return (
    <span style={{ whiteSpace: "nowrap" }}>
      <input
        type="number"
        value={na}
        onChange={(e) => setNa(e.target.value)}
        style={style}
        placeholder="Na+"
      />
      <input
        type="number"
        value={k}
        onChange={(e) => setK(e.target.value)}
        style={style}
        placeholder="K+"
      />
      <input
        type="number"
        value={hco3}
        onChange={(e) => setHco3(e.target.value)}
        style={style}
        placeholder="HCO₃⁻"
      />
      <input
        type="number"
        value={cl}
        onChange={(e) => setCl(e.target.value)}
        style={style}
        placeholder="Cl⁻"
      />
      →
      <input
        type="text"
        readOnly
        value={result}
        style={outStyle}
      />
    </span>
  );
}