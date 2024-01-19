import { FC, ReactNode } from 'react';
import { StyledButton } from './Button.styles.ts';

interface ButtonProps {
  children: ReactNode;
  handleClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, handleClick }) => {
  return <StyledButton onClick={handleClick}>{children}</StyledButton>;
};

export default Button;
