import { FC, ReactNode } from 'react';
import { StyledButton } from './Button.styles.ts';

interface ButtonProps {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children }) => {
  return <StyledButton>{children}</StyledButton>;
};

export default Button;
