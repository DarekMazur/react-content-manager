import styled from 'styled-components';

interface IStyledTag {
  $align?: string;
  $size?: string;
  $padding?: string;
  $margin?: string;
}

export const StyledHeading = styled.h1<IStyledTag>`
  font-size: ${({ $size, theme }) =>
    $size ? theme.fontSize[$size] : 'inherit'};
  text-align: ${({ $align }) => ($align ? $align : 'inherit')};
  padding: ${({ $padding }) => ($padding ? $padding : 'inherit')};
  margin: ${({ $margin }) => ($margin ? $margin : 'inherit')};
`;
