import { FC, ReactNode } from 'react';
import { StyledParagraph } from './P.styles.ts';

interface IParagraphProps {
  children: ReactNode;
  size?: string;
  color?: string;
  weight?: string;
  family?: string;
}
const P: FC<IParagraphProps> = ({ children, size, weight, family, color }) => {
  return (
    <StyledParagraph
      $fontSize={size}
      $color={color}
      $weight={weight}
      $family={family}
    >
      {children}
    </StyledParagraph>
  );
};

export default P;
