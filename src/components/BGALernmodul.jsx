import React, { useMemo, useState } from "react";

const defaults = {
  ph: "",
  pco2: "",
  hco3: "",
  phFlag: "",
  pco2Flag: "",
  hco3Flag: "",
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

function FieldRow({
  label,
  value,
  setValue,
  flagValue,
  setFlagValue,
  placeholder,
  lockValue = false,
  namePrefix = "case",
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "140px 180px 1fr",
        gap: "1rem",
        alignItems: "center",
        padding: "0.75rem 0",
        borderBottom: "1px solid var(--ifm-color-emphasis-200)",
      }}
    >
      <div style={{ fontWeight: 700 }}>{label}</div>

      <input
        type="text"
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        readOnly={lockValue}
        onChange={(e) => setValue(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.6rem",
          borderRadius: "0.5rem",
          border: "1px solid var(--ifm-color-emphasis-300)",
          background: lockValue
            ? "var(--ifm-color-emphasis-100)"
            : "var(--ifm-background-surface-color)",
          color: "var(--ifm-font-color-base)",
          cursor: lockValue ? "not-allowed" : "text",
          opacity: lockValue ? 0.95 : 1,
        }}
      />

      <RadioGroup
        name={`${namePrefix}-${label}-flag`}
        value={flagValue}
        onChange={setFlagValue}
        options={[
          { value: "hoch", label: "hoch" },
          { value: "normal", label: "normal" },
          { value: "erniedrigt", label: "erniedrigt" },
        ]}
      />
    </div>
  );
}

const labelMap = {
  phFlag: "pH (hoch/normal/erniedrigt)",
  pco2Flag: "pCO₂ (hoch/normal/erniedrigt)",
  hco3Flag: "HCO₃⁻ (hoch/normal/erniedrigt)",
  acidBase: "Azidose/Alkalose",
  primary: "respiratorisch/metabolisch",
  compensation: "Kompensation",
};

export default function BGALernmodul({
  title = "BGA – Einordnen & Diagnose (Übung)",
  showReset = true,
  presetValues = null, // { ph: "7.20", pco2: "28", hco3: "12" }
  lockValues = false, // true = Werte sind vorgegeben (readOnly)
  solution = null, // { phFlag:"erniedrigt", pco2Flag:"erniedrigt", hco3Flag:"erniedrigt", acidBase:"azidose", primary:"metabolisch", compensation:"partiell" }
}) {
  const uid = React.useId(); // verhindert Radio-Kollisionen zwischen mehreren Fällen

  const [state, setState] = useState(() => ({
    ...defaults,
    ...(presetValues
      ? {
          ph: presetValues.ph ?? "",
          pco2: presetValues.pco2 ?? "",
          hco3: presetValues.hco3 ?? "",
        }
      : {}),
  }));

  React.useEffect(() => {
    if (!presetValues) return;
    setState((s) => ({
      ...s,
      ph: presetValues.ph ?? "",
      pco2: presetValues.pco2 ?? "",
      hco3: presetValues.hco3 ?? "",
      // Kreuze/Dx nicht überschreiben
    }));
  }, [presetValues]);

  const set = (key) => (val) => setState((s) => ({ ...s, [key]: val }));

  const reset = () => {
    setState({
      ...defaults,
      ...(presetValues
        ? {
            ph: presetValues.ph ?? "",
            pco2: presetValues.pco2 ?? "",
            hco3: presetValues.hco3 ?? "",
          }
        : {}),
    });
  };

  const answerKeys = ["phFlag", "pco2Flag", "hco3Flag", "acidBase", "primary", "compensation"];

  const filledAnswers = useMemo(() => {
    let n = 0;
    for (const k of answerKeys) if (String(state[k] ?? "").trim() !== "") n += 1;
    return n;
  }, [state]);

  const isComplete = filledAnswers === answerKeys.length;

  const check = useMemo(() => {
    if (!isComplete || !solution) return null;

    const wrong = [];
    for (const k of answerKeys) {
      const expected = solution[k];
      const actual = state[k];

      // expected kann string sein (Standard). (Arrays wären hier leicht möglich, aber aktuell nicht nötig.)
      const ok = expected === actual;

      if (!ok) wrong.push(k);
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
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem" }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <div style={{ opacity: 0.75, fontSize: "0.95rem" }}>
          Ausgefüllt: <b>{filledAnswers}</b>/{answerKeys.length}
        </div>
      </div>

      <div style={{ marginTop: "0.75rem" }}>
        <FieldRow
          label="pH"
          value={state.ph}
          setValue={set("ph")}
          flagValue={state.phFlag}
          setFlagValue={set("phFlag")}
          placeholder="x"
          lockValue={lockValues}
          namePrefix={uid}
        />
        <FieldRow
          label="pCO₂"
          value={state.pco2}
          setValue={set("pco2")}
          flagValue={state.pco2Flag}
          setFlagValue={set("pco2Flag")}
          placeholder="x"
          lockValue={lockValues}
          namePrefix={uid}
        />
        <FieldRow
          label="HCO₃⁻"
          value={state.hco3}
          setValue={set("hco3")}
          flagValue={state.hco3Flag}
          setFlagValue={set("hco3Flag")}
          placeholder="x"
          lockValue={lockValues}
          namePrefix={uid}
        />
      </div>

      <div style={{ marginTop: "1rem", display: "grid", gap: "1rem" }}>
        <div
          style={{
            padding: "0.75rem",
            borderRadius: "0.75rem",
            border: "1px solid var(--ifm-color-emphasis-200)",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Säure-Basen-Status</div>
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

        <div
          style={{
            padding: "0.75rem",
            borderRadius: "0.75rem",
            border: "1px solid var(--ifm-color-emphasis-200)",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Primäre Störung</div>
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

        <div
          style={{
            padding: "0.75rem",
            borderRadius: "0.75rem",
            border: "1px solid var(--ifm-color-emphasis-200)",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Kompensation</div>
          <RadioGroup
            name={`${uid}-compensation`}
            value={state.compensation}
            onChange={set("compensation")}
            options={[
              { value: "keine", label: "keine" },
              { value: "partiell", label: "partiell" },
              { value: "vollstaendig", label: "vollständig" },
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
                background: "rgba(0, 200, 83, 0.08)",
              }}
            >
              <div style={{ fontWeight: 800 }}>✅ Richtig!</div>
              <div style={{ marginTop: "0.25rem", opacity: 0.9 }}>
                Alles korrekt zugeordnet. Nice.
              </div>
            </div>
          ) : (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                border: "1px solid var(--ifm-color-danger)",
                background: "rgba(244, 67, 54, 0.08)",
              }}
            >
              <div style={{ fontWeight: 800 }}>❌ Noch nicht richtig</div>
              <div style={{ marginTop: "0.25rem", opacity: 0.9 }}>
                Falsch bei:
                <ul style={{ margin: "0.35rem 0 0 1.1rem" }}>
                  {check?.wrongKeys.map((k) => (
                    <li key={k}>{labelMap[k] ?? k}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        ) : (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.75rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--ifm-color-warning)",
              background: "rgba(255, 193, 7, 0.10)",
            }}
          >
            <div style={{ fontWeight: 800 }}>⚠️ Fertig – aber keine Lösung hinterlegt</div>
            <div style={{ marginTop: "0.25rem", opacity: 0.9 }}>
              (Füge dem Modul eine <code>solution</code>-Prop hinzu, dann kann ich richtig/falsch prüfen.)
            </div>
          </div>
        )
      ) : (
        <div style={{ marginTop: "1rem", opacity: 0.8, fontSize: "0.95rem" }}>
          Noch <b>{answerKeys.length - filledAnswers}</b> Auswahl
          {answerKeys.length - filledAnswers === 1 ? "" : "en"} offen.
        </div>
      )}

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
        {showReset && (
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "0.55rem 0.8rem",
              borderRadius: "0.6rem",
              border: "1px solid var(--ifm-color-emphasis-300)",
              background: "transparent",
              cursor: "pointer",
              color: "var(--ifm-font-color-base)",
            }}
          >
            Zurücksetzen
          </button>
        )}
        <div style={{ opacity: 0.8, fontSize: "0.95rem", alignSelf: "center" }}>
          Werte sind vorgegeben – du kreuzt nur ein.
        </div>
      </div>
    </div>
  );
}