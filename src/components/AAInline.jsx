import React, { useMemo, useState } from "react";

export default function AAInline({
  decimals = 1,
  w = 60,
}) {
  const [paCO2, setPaCO2] = useState("");
  const [fiO2, setFiO2] = useState("");
  const [paO2, setPaO2] = useState("");

  const result = useMemo(() => {
    const c = Number(paCO2.replace(",", "."));
    const f = Number(fiO2.replace(",", "."));
    const o = Number(paO2.replace(",", "."));

    if (!Number.isFinite(c) || !Number.isFinite(f) || !Number.isFinite(o)) {
      return "";
    }

    const PAO2 = f * 713 - (c / 0.8);
    const gradient = PAO2 - o;

    return gradient.toFixed(decimals);
  }, [paCO2, fiO2, paO2, decimals]);

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
        inputMode="decimal"
        value={paCO2}
        onChange={(e) => setPaCO2(e.target.value)}
        style={style}
        placeholder="PaCO₂"
      />
      <input
        type="number"
        inputMode="decimal"
        value={fiO2}
        onChange={(e) => setFiO2(e.target.value)}
        style={style}
        placeholder="FiO₂"
      />
      <input
        type="number"
        inputMode="decimal"
        value={paO2}
        onChange={(e) => setPaO2(e.target.value)}
        style={style}
        placeholder="PaO₂"
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