import React, { useMemo, useState } from "react";

export default function InlineEquation({
  inputLabel = "HCO₃⁻",
  outputLabel = "pCO₂",
  compute,
  decimals = 1,
  width = 70,
}) {
  const [value, setValue] = useState("");

  const result = useMemo(() => {
    const v = value.replace(",", ".");
    const num = Number(v);
    if (!Number.isFinite(num)) return "";
    const out = compute ? compute(num) : "";
    return Number.isFinite(out) ? out.toFixed(decimals) : "";
  }, [value, compute, decimals]);

  return (
    <span style={{ whiteSpace: "nowrap" }}>
      <label>{inputLabel}: </label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          width: width,
          margin: "0 6px",
          padding: "2px 6px",
        }}
      />
      = 
      <input
        type="text"
        readOnly
        value={result}
        style={{
          width: width,
          marginLeft: 6,
          padding: "2px 6px",
          background: "#f5f5f5",
        }}
      />
      <label style={{ marginLeft: 6 }}>{outputLabel}</label>
    </span>
  );
}