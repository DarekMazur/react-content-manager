import { FC, ReactNode } from 'react';
import { StyledParagraph } from './P.styles.ts';

interface ParagraphProps {
  children: ReactNode;
  size?: string;
  color?: string;
  weight?: string;
  family?: string;
}
const P: FC<ParagraphProps> = ({ children, size, weight, family, color }) => {
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
