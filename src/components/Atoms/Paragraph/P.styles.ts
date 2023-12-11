import styled from 'styled-components';

interface ParagraphStyleProps {
  $fontSize?: string;
  $color?: string;
  $weight?: string;
  $family?: string;
}

export const StyledParagraph = styled.p<ParagraphStyleProps>`
  font-size: ${({ $fontSize, theme }) =>
    $fontSize ? theme.fontSize[$fontSize] : 'inherit'};
  color: ${({ $color, theme }) => ($color ? theme.colors[$color] : 'inherit')};
  font-weight: ${({ $weight, theme }) =>
    $weight ? theme.fontWeight[$weight] : 'inherit'};
  font-family: ${({ $family, theme }) =>
    $family ? theme.fontFamily[$family] : 'inherit'};
`;
