import { FC, ReactNode } from 'react';
import { StyledActionButton } from './ActionButton.styles.ts';

interface IButtonProps {
  children: ReactNode;
  isDel?: boolean;
  handleClick: () => void;
}

const ActionButton: FC<IButtonProps> = ({ children, isDel, handleClick }) => {
  return (
    <StyledActionButton $delete={isDel} onClick={handleClick}>
      {children}
    </StyledActionButton>
  );
};

export default ActionButton;
