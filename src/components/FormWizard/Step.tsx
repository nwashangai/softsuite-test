import React from 'react';
import { Indicator, Line, StepTitle, StepWrapper } from './styles';

type Props = {
  item: { title: string };
  index: number;
  current: number;
};

function Step({ item, index, current }: Props) {
  return (
    <StepWrapper>
      <Line active={current >= index} />
      <Indicator active={current >= index}>
        <span>{index + 1}</span>
      </Indicator>
      <StepTitle active={current >= index}>{item.title}</StepTitle>
    </StepWrapper>
  );
}

export default Step;
