import styled from 'styled-components';

interface ParagraphStyleProps {
  $fontSize?: string;
  $color?: string;
  $weight?: string;
  $family?: string;
  $padding?: string;
  $margin?: string;
}

export const StyledParagraph = styled.p<ParagraphStyleProps>`
  font-size: ${({ $fontSize, theme }) =>
    $fontSize ? theme.fontSize[$fontSize] : 'inherit'};
  color: ${({ $color, theme }) => ($color ? theme.colors[$color] : 'inherit')};
  font-weight: ${({ $weight, theme }) =>
    $weight ? theme.fontWeight[$weight] : 'inherit'};
  font-family: ${({ $family, theme }) =>
    $family ? theme.fonts[$family] : 'inherit'};
  padding: ${({ $padding }) => ($padding ? $padding : '0')};
  margin: ${({ $margin }) => ($margin ? $margin : '0')};
`;
