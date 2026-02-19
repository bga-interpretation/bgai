import React, { useMemo, useState } from 'react';

type Choice = 'high' | 'normal' | 'low';

const LABEL: Record<Choice, string> = {
  high: 'erhöht',
  normal: 'normal',
  low: 'erniedrigt',
};

export default function ValueCheck(props: {
  text: string;
  correct: Choice;
  correctMsg: string;
  wrongMsg?: string;
}) {
  const { text, correct, correctMsg, wrongMsg = 'Leider falsch.' } = props;

  const [selected, setSelected] = useState<Choice | null>(null);

  const result = useMemo(() => {
    if (!selected) return null;
    return selected === correct ? 'correct' : 'wrong';
  }, [selected, correct]);

  return (
    <div style={{
      border: '1px solid var(--ifm-color-emphasis-300)',
      borderRadius: 12,
      padding: 16,
      margin: '16px 0',
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 16,
      alignItems: 'start',
    }}>
      {/* Links: Text */}
      <div style={{ fontSize: 16, fontWeight: 600 }}>
        {text}
      </div>

      {/* Rechts: 3 "Quadrate" */}
      <div style={{ display: 'flex', gap: 8 }}>
        {(Object.keys(LABEL) as Choice[]).map((c) => {
          const isActive = selected === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setSelected(c)}
              aria-pressed={isActive}
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                border: isActive
                  ? '2px solid var(--ifm-color-primary)'
                  : '1px solid var(--ifm-color-emphasis-300)',
                background: 'var(--ifm-background-color)',
                cursor: 'pointer',
                fontWeight: 700,
              }}
              title={LABEL[c]}
            >
              {/* Kurzlabel im Quadrat */}
              {c === 'high' ? '↑' : c === 'normal' ? '↔' : '↓'}
            </button>
          );
        })}
      </div>

      {/* Feedback-Zeile über volle Breite */}
      <div style={{ gridColumn: '1 / -1', marginTop: 6 }}>
        {result === 'correct' && (
          <div style={{ color: 'var(--ifm-color-success)', fontWeight: 600 }}>
            {correctMsg}
          </div>
        )}
        {result === 'wrong' && (
          <div style={{ color: 'var(--ifm-color-danger)', fontWeight: 600 }}>
            {wrongMsg}
          </div>
        )}
      </div>
    </div>
  );
}
