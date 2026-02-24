import React, { useMemo, useState } from "react";

export default function PFInline({
  decimals = 0,
  w = 60,
}) {
  const [paO2, setPaO2] = useState("");
  const [flow, setFlow] = useState("");

  const result = useMemo(() => {
    const o = Number(paO2.replace(",", "."));
    const l = Number(flow.replace(",", "."));

    if (!Number.isFinite(o) || !Number.isFinite(l)) {
      return "";
    }

    // FiO2 in Prozent
    const fiO2_percent = 21 + 4 * l;

    // Umrechnung in Fraktion
    const fiO2 = fiO2_percent / 100;

    if (fiO2 <= 0) return "";

    const ratio = o / fiO2;

    return ratio.toFixed(decimals);
  }, [paO2, flow, decimals]);

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
        value={paO2}
        onChange={(e) => setPaO2(e.target.value)}
        style={style}
        placeholder="PaO₂"
      />
      <input
        type="number"
        inputMode="decimal"
        value={flow}
        onChange={(e) => setFlow(e.target.value)}
        style={style}
        placeholder="l/min"
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