import { FC, ReactNode } from 'react';
import { StyledActionButton } from './ActionButton.styles.ts';

interface ButtonProps {
  children: ReactNode;
  isDel?: boolean;
  handleClick: () => void;
}

const Button: FC<ButtonProps> = ({ children, isDel, handleClick }) => {
  return (
    <StyledActionButton $delete={isDel} onClick={handleClick}>
      {children}
    </StyledActionButton>
  );
};

export default Button;
