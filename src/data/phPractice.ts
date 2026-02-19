type Choice = 'high' | 'normal' | 'low';

export const phPractice: {
  id: string;
  text: string;
  correct: Choice;
  correctMsg: string;
  wrongMsg?: string;
}[] = [
  {
    id: 'ph-001',
    text: 'pH = 7,25',
    correct: 'low',
    correctMsg: 'Richtig, pH-Wert erniedrigt.',
    wrongMsg: 'Falsch: 7,25 ist unter 7,35 → Azidämie.',
  },
  {
    id: 'ph-002',
    text: 'pH = 7,40',
    correct: 'normal',
    correctMsg: 'Richtig, pH-Wert normal.',
    wrongMsg: 'Falsch: 7,40 liegt im Normbereich (ca. 7,35–7,45).',
  },
  {
    id: 'ph-003',
    text: 'pH = 7,52',
    correct: 'high',
    correctMsg: 'Richtig, pH-Wert erhöht.',
    wrongMsg: 'Falsch: 7,52 ist über 7,45 → Alkalämie.',
  },
];
