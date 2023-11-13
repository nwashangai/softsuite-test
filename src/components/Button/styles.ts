import styled from 'styled-components';
import { Button, ButtonProps } from 'antd';

interface BtnProps extends ButtonProps {
  isInverted?: boolean;
  width?: string;
}

export const StyledButton = styled(Button)<BtnProps>`
  background-color: ${({ theme, isInverted }) =>
    isInverted ? theme.white : theme.primaryColor};
  border-width: ${({ isInverted }) => (isInverted ? 2 : 0)};
  border-color: ${({ theme, isInverted }) =>
    isInverted ? theme.primaryColor : theme.white};
  ${({ width }) => (width ? `width: ${width}` : '')};

  border-radius: 4px;

  span {
    color: ${({ theme, isInverted }) =>
      isInverted ? theme.primaryColor : theme.white};
  }

  > span > div {
    margin-left: 10px;
  }

  &:hover {
    background-color: ${({ theme, isInverted }) =>
      isInverted ? theme.white : theme.primaryColor};
  }
`;
