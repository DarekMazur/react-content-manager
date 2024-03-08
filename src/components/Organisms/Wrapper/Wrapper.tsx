import { FC, ReactNode } from 'react';
import { StyledWrapper } from './Wrapper.styles.ts';

interface IWrapperProps {
  children: ReactNode;
  align?: string;
  justify?: string;
  role?: string;
  width?: string;
  padding?: string;
}

const Wrapper: FC<IWrapperProps> = ({
  children,
  justify,
  align,
  role = 'wrapper',
  width,
  padding,
}) => {
  return (
    <StyledWrapper
      role={role}
      $justify={justify}
      $align={align}
      $width={width}
      $padding={padding}
    >
      {children}
    </StyledWrapper>
  );
};

export default Wrapper;
