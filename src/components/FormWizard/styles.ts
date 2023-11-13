import { Divider, DividerProps } from 'antd';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styled from 'styled-components';

interface IndicatorProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  active?: boolean;
}

interface TitleProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  active?: boolean;
}

interface LineProps extends DividerProps {
  active?: boolean;
}

export const WizardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StepsWrapper = styled.div<{ length: number }>`
  width: 100%;
  display: flex;
  margin-top: 40px;

  > div {
    width: calc(100% / ${({ length }) => (length || 1) + 1});
    min-width: calc(100% / ${({ length }) => (length || 1) + 1});
  }
`;

export const Line = styled(Divider)<LineProps>`
  border-color: ${(props) =>
    props.active ? props.theme.primaryColor : props.theme.defaultBorderColor};
  border-width: 2px;
`;

export const StepWrapper = styled.div`
  position: relative;
`;

export const Indicator = styled.div<IndicatorProps>`
  position: absolute;
  top: 50%;
  right: -17px;
  z-index: 1;
  transform: translateY(-50%);
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-top: 0;
  margin-bottom: 0;
  line-height: 32px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.primaryColor};
  transition: background-color 0.3s, border-color 0.3s;
  background-color: ${({ theme, active }) =>
    active ? theme.primaryColor : theme.white};

  span {
    color: ${({ theme, active }) =>
      active ? theme.white : theme.primaryColor};
  }
`;

export const StepTitle = styled.h4<TitleProps>`
  position: absolute;
  text-align: center;
  width: 120px;
  top: -40px;
  right: -60px;
  white-space: nowrap;
  z-index: 1;
  font-weight: 500;
  color: ${({ active, theme }) =>
    active ? theme.primaryColor : theme.textColor};
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
`;
