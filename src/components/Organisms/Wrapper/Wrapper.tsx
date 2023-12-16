import { FC, ReactNode } from 'react';
import { StyledWrapper } from './Wrapper.styles.ts';

interface WrapperProps {
  children: ReactNode;
  align?: string;
  justify?: string;
  role?: string;
  width?: string;
}

const Wrapper: FC<WrapperProps> = ({
  children,
  justify,
  align,
  role = 'wrapper',
  width,
}) => {
  return (
    <StyledWrapper role={role} $justify={justify} $align={align} $width={width}>
      {children}
    </StyledWrapper>
  );
};

export default Wrapper;
