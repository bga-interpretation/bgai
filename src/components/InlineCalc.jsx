import React, { useMemo, useState } from "react";

export default function InlineCalc({
  compute,          // (x:number) => number
  decimals = 1,     // Rundung
  w = 64,           // Breite der Felder in px
  placeholder = "",
}) {
  const [raw, setRaw] = useState("");

  const out = useMemo(() => {
    const v = raw.trim().replace(",", ".");
    if (v === "") return "";
    const x = Number(v);
    if (!Number.isFinite(x) || typeof compute !== "function") return "";
    const y = compute(x);
    return Number.isFinite(y) ? y.toFixed(decimals) : "";
  }, [raw, compute, decimals]);

  const inputStyle = {
    width: w,
    padding: "2px 6px",
    margin: "0 4px",
    verticalAlign: "baseline",
  };

  const outputStyle = {
    ...inputStyle,
    background: "rgba(0,0,0,0.06)",
  };

  return (
    <span style={{ whiteSpace: "nowrap" }}>
      <input
        type="number"
        inputMode="decimal"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
      />
      <span style={{ margin: "0 4px" }}>→</span>
      <input type="text" readOnly value={out} style={outputStyle} />
    </span>
  );
}