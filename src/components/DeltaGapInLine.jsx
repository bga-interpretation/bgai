import React, { useMemo, useState } from "react";

export default function DeltaGapInline({
  decimals = 2,
  w = 60,
}) {
  const [ag, setAg] = useState("");
  const [hco3, setHco3] = useState("");

  const result = useMemo(() => {
    const a = Number(ag.replace(",", "."));
    const h = Number(hco3.replace(",", "."));

    if (!Number.isFinite(a) || !Number.isFinite(h)) {
      return "";
    }

    const denominator = 24 - h;

    if (denominator === 0) return "";

    const delta = (a - 11) / denominator;

    return delta.toFixed(decimals);
  }, [ag, hco3, decimals]);

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
        value={ag}
        onChange={(e) => setAg(e.target.value)}
        style={style}
        placeholder="AG"
      />
      <input
        type="number"
        inputMode="decimal"
        value={hco3}
        onChange={(e) => setHco3(e.target.value)}
        style={style}
        placeholder="HCO₃⁻"
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