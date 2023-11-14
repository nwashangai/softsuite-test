import React from 'react';
import { StyledButton } from './styles';
import { ButtonProps } from 'antd';

interface CustomButtonProps extends ButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  gap?: number;
  isInverted?: boolean;
  width?: string;
}

function Button({ children, icon, gap, ...props }: CustomButtonProps) {
  return (
    <StyledButton {...props}>
      {children && <span>{children}</span>}
      {icon && icon}
    </StyledButton>
  );
}

export default Button;
