import { FC, ReactNode } from 'react';
import { StyledButton } from './Button.styles.ts';

interface IButtonProps {
  children: ReactNode;
  handleClick?: () => void;
}

const Button: FC<IButtonProps> = ({ children, handleClick }) => {
  return <StyledButton onClick={handleClick}>{children}</StyledButton>;
};

export default Button;
