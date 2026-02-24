import React, { useMemo, useState } from "react";

export default function AlkaloseInline({
  decimals = 1,
  w = 60,
}) {
  const [hco3, setHco3] = useState("");

  const result = useMemo(() => {
    const h = Number(hco3.replace(",", "."));

    if (!Number.isFinite(h)) {
      return "";
    }

    const pco2 = (0.7 * h) + 20;

    return pco2.toFixed(decimals);
  }, [hco3, decimals]);

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