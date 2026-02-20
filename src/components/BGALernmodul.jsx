import React, { useMemo, useState } from "react";

const defaults = {
  ph: "",
  pco2: "",
  hco3: "",
  acidBase: "",
  primary: "",
  compensation: "",
};

function RadioGroup({ name, value, onChange, options }) {
  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      {options.map((opt) => (
        <label
          key={opt.value}
          style={{ display: "inline-flex", gap: "0.35rem", alignItems: "center" }}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={(e) => onChange(e.target.value)}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  );
}

const labelMap = {
  acidBase: "Azidose / Alkalose",
  primary: "Primäre Störung",
  compensation: "Kompensation",
};

export default function BGALernmodul({
  title = "BGA – Diagnose",
  presetValues = null,
  lockValues = true,
  solution = null,
}) {
  const uid = React.useId();

  const [state, setState] = useState(() => ({
    ...defaults,
    ...(presetValues || {}),
  }));

  const set = (key) => (val) =>
    setState((s) => ({
      ...s,
      [key]: val,
    }));

  const reset = () => {
    setState({
      ...defaults,
      ...(presetValues || {}),
    });
  };

  const answerKeys = ["acidBase", "primary", "compensation"];

  const filledAnswers = useMemo(() => {
    return answerKeys.filter((k) => state[k] !== "").length;
  }, [state]);

  const isComplete = filledAnswers === answerKeys.length;

  const check = useMemo(() => {
    if (!isComplete || !solution) return null;

    const wrong = [];

    for (const k of answerKeys) {
      if (state[k] !== solution[k]) {
        wrong.push(k);
      }
    }

    return {
      isCorrect: wrong.length === 0,
      wrongKeys: wrong,
    };
  }, [isComplete, solution, state]);

  return (
    <div
      style={{
        border: "1px solid var(--ifm-color-emphasis-200)",
        borderRadius: "1rem",
        padding: "1rem",
        background: "var(--ifm-background-surface-color)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <div style={{ opacity: 0.7 }}>
          Ausgefüllt: <b>{filledAnswers}</b>/{answerKeys.length}
        </div>
      </div>

      {/* Werte */}
      <div
        style={{
          marginTop: "1rem",
          padding: "0.75rem",
          borderRadius: "0.75rem",
          border: "1px solid var(--ifm-color-emphasis-200)",
          background: "var(--ifm-color-emphasis-100)",
        }}
      >
        <b>Gegebene Werte:</b>
        <div style={{ marginTop: "0.5rem" }}>
          pH = {state.ph} &nbsp;&nbsp; | &nbsp;&nbsp;
          pCO₂ = {state.pco2} &nbsp;&nbsp; | &nbsp;&nbsp;
          HCO₃⁻ = {state.hco3}
        </div>
      </div>

      {/* Diagnose */}
      <div style={{ marginTop: "1rem", display: "grid", gap: "1rem" }}>
        <div>
          <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>
            Säure-Basen-Status
          </div>
          <RadioGroup
            name={`${uid}-acidBase`}
            value={state.acidBase}
            onChange={set("acidBase")}
            options={[
              { value: "azidose", label: "Azidose" },
              { value: "alkalose", label: "Alkalose" },
            ]}
          />
        </div>

        <div>
          <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>
            Primäre Störung
          </div>
          <RadioGroup
            name={`${uid}-primary`}
            value={state.primary}
            onChange={set("primary")}
            options={[
              { value: "respiratorisch", label: "respiratorisch" },
              { value: "metabolisch", label: "metabolisch" },
            ]}
          />
        </div>

        <div>
          <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>
            Kompensation vorhanden?
          </div>
          <RadioGroup
            name={`${uid}-comp`}
            value={state.compensation}
            onChange={set("compensation")}
            options={[
              { value: "ja", label: "ja" },
              { value: "nein", label: "nein" },
            ]}
          />
        </div>
      </div>

      {/* Feedback */}
      {isComplete ? (
        solution ? (
          check?.isCorrect ? (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                border: "1px solid var(--ifm-color-success)",
                background: "rgba(0,200,83,0.08)",
              }}
            >
              <b>✅ Richtig!</b>
            </div>
          ) : (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                border: "1px solid var(--ifm-color-danger)",
                background: "rgba(244,67,54,0.08)",
              }}
            >
              <b>❌ Noch nicht korrekt.</b>
              <ul style={{ marginTop: "0.5rem" }}>
                {check.wrongKeys.map((k) => (
                  <li key={k}>{labelMap[k]}</li>
                ))}
              </ul>
            </div>
          )
        ) : (
          <div style={{ marginTop: "1rem" }}>
            ⚠️ Keine Lösung hinterlegt.
          </div>
        )
      ) : (
        <div style={{ marginTop: "1rem", opacity: 0.7 }}>
          Noch {answerKeys.length - filledAnswers} Auswahl(en) offen.
        </div>
      )}

      <button
        onClick={reset}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 0.8rem",
          borderRadius: "0.6rem",
          border: "1px solid var(--ifm-color-emphasis-300)",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        Zurücksetzen
      </button>
    </div>
  );
}