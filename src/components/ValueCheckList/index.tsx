import React from 'react';
import ValueCheck from '@site/src/components/ValueCheck';

type Choice = 'high' | 'normal' | 'low';

export type ValueCheckItem = {
  id: string;
  text: string;
  correct: Choice;
  correctMsg: string;
  wrongMsg?: string;
};

export default function ValueCheckList(props: { items: ValueCheckItem[] }) {
  const { items } = props;

  return (
    <div>
      {items.map((item) => (
        <ValueCheck
          key={item.id}
          text={item.text}
          correct={item.correct}
          correctMsg={item.correctMsg}
          wrongMsg={item.wrongMsg}
        />
      ))}
    </div>
  );
}