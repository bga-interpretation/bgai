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
  {
    id: 'ph-004',
    text: 'pCO2 (arteriell) = 48',
    correct: 'high',
    correctMsg: 'Richtig, pCO2 (arteriell) erhöht.',
    wrongMsg: 'Falsch: 48 ist über 45 → erhöht.',
  },
  {
    id: 'ph-005',
    text: 'pCO2 (arteriell) = 29',
    correct: 'low',
    correctMsg: 'Richtig, pCO2 (arteriell) erniedrigt.',
    wrongMsg: 'Falsch: 29 ist unter 32 → erniedrigt.',
  },
  {
    id: 'ph-006',
    text: 'pCO2 (arteriell) = 37',
    correct: 'normal',
    correctMsg: 'Richtig, 32–45 mmHg.',
    wrongMsg: 'Falsch, 32–45 mmHg.',
  },
  {
    id: 'ph-007',
    text: 'pO2 (arteriell) = 76',
    correct: 'normal',
    correctMsg: 'Richtig, 65–100 mmHg.',
    wrongMsg: 'Falsch, 65–100 mmHg.',
  },
  {
    id: 'ph-008',
    text: 'pO2 (arteriell) = 59',
    correct: 'low',
    correctMsg: 'Richtig, 65–100 mmHg.',
    wrongMsg: 'Falsch, 65–100 mmHg.',
  },
  {
    id: 'ph-009',
    text: 'Na = 152',
    correct: 'high',
    correctMsg: 'Richtig, 135–145 mmol/l.',
    wrongMsg: 'Falsch, 135–145 mmol/l.',
  },
  {
    id: 'ph-010',
    text: 'Na = 139',
    correct: 'normal',
    correctMsg: 'Richtig, 135–145 mmol/l.',
    wrongMsg: 'Falsch, 135–145 mmol/l.',
  },
  {
    id: 'ph-011',
    text: 'Na = 123',
    correct: 'low',
    correctMsg: 'Richtig, 135–145 mmol/l.',
    wrongMsg: 'Falsch, 135–145 mmol/l.',
  },
  {
    id: 'ph-012',
    text: 'K = 3,3',
    correct: 'low',
    correctMsg: 'Richtig, 3,6–5,2 mmol/l.',
    wrongMsg: 'Falsch, 3,6–5,2 mmol/l.',
  },
  {
    id: 'ph-013',
    text: 'K = 5,5',
    correct: 'high',
    correctMsg: 'Richtig, 3,6–5,2 mmol/l.',
    wrongMsg: 'Falsch, 3,6–5,2 mmol/l.',
  },
  {
    id: 'ph-014',
    text: 'K = 4,2',
    correct: 'normal',
    correctMsg: 'Richtig, 3,6–5,2 mmol/l.',
    wrongMsg: 'Falsch, 3,6–5,2 mmol/l.',
  },
  {
    id: 'ph-015',
    text: 'Ca = 1,05',
    correct: 'low',
    correctMsg: 'Richtig, 1,15–1,35 mmol/l.',
    wrongMsg: 'Falsch, 1,15–1,35 mmol/l.',
  },
  {
    id: 'ph-016',
    text: 'Ca = 1,25',
    correct: 'normal',
    correctMsg: 'Richtig, 1,15–1,35 mmol/l.',
    wrongMsg: 'Falsch, 1,15–1,35 mmol/l.',
  },
  {
    id: 'ph-017',
    text: 'Ca = 1,40',
    correct: 'high',
    correctMsg: 'Richtig, 1,15–1,35 mmol/l.',
    wrongMsg: 'Falsch, 1,15–1,35 mmol/l.',
  },
  {
    id: 'ph-018',
    text: 'Cl = 87',
    correct: 'low',
    correctMsg: 'Richtig, 98–106 mmol/l.',
    wrongMsg: 'Falsch, 98–106 mmol/l.',
  },
  {
    id: 'ph-019',
    text: 'Cl = 101',
    correct: 'normal',
    correctMsg: 'Richtig, 98–106 mmol/l.',
    wrongMsg: 'Falsch, 98–106 mmol/l.',
  },
  {
    id: 'ph-020',
    text: 'Cl = 114',
    correct: 'high',
    correctMsg: 'Richtig, 98–106 mmol/l.',
    wrongMsg: 'Falsch, 98–106 mmol/l.',
  },
  {
    id: 'ph-021',
    text: 'HCO3- = 17',
    correct: 'low',
    correctMsg: 'Richtig, 22-26 mmol/l.',
    wrongMsg: 'Falsch, 22-26 mmol/l.',
  },
  {
    id: 'ph-022',
    text: 'HCO3- = 23',
    correct: 'normal',
    correctMsg: 'Richtig, 22-26 mmol/l.',
    wrongMsg: 'Falsch, 22-26 mmol/l.',
  },
  {
    id: 'ph-023',
    text: 'HCO3- = 31',
    correct: 'high',
    correctMsg: 'Richtig, 22-26 mmol/l.',
    wrongMsg: 'Falsch, 22-26 mmol/l.',
  },
];

