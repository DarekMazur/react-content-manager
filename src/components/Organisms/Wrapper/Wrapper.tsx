import { FC, ReactNode } from 'react';
import { StyledWrapper } from './Wrapper.styles.ts';

interface WrapperProps {
  children: ReactNode;
  align?: string;
  justify?: string;
}

const Wrapper: FC<WrapperProps> = ({ children, justify, align }) => {
  return (
    <StyledWrapper $justify={justify} $align={align}>
      {children}
    </StyledWrapper>
  );
};

export default Wrapper;
