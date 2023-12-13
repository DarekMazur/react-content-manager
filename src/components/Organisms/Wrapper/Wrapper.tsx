import { FC, ReactNode } from 'react';
import { StyledWrapper } from './Wrapper.styles.ts';

interface WrapperProps {
  children: ReactNode;
  align?: string;
  justify?: string;
  role?: string;
}

const Wrapper: FC<WrapperProps> = ({
  children,
  justify,
  align,
  role = 'wrapper',
}) => {
  return (
    <StyledWrapper role={role} $justify={justify} $align={align}>
      {children}
    </StyledWrapper>
  );
};

export default Wrapper;
