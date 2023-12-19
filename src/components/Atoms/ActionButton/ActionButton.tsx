import { FC, ReactNode } from 'react';
import { StyledActionButton } from './ActionButton.styles.ts';

interface ButtonProps {
  children: ReactNode;
  isDel?: boolean;
}

const Button: FC<ButtonProps> = ({ children, isDel }) => {
  return <StyledActionButton $delete={isDel}>{children}</StyledActionButton>;
};

export default Button;
