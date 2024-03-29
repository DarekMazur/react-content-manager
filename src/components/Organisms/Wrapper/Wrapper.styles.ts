import styled from 'styled-components';

interface IStyledProps {
  $justify?: string;
  $align?: string;
  $width?: string;
  $padding?: string;
}
export const StyledWrapper = styled.div<IStyledProps>`
  display: flex;
  justify-content: ${({ $justify }) => ($justify ? $justify : `unset`)};
  align-items: ${({ $align }) => ($align ? $align : `unset`)};
  gap: 2rem;
  color: ${({ theme }) => theme.colors.darkBlue};
  width: ${({ $width }) => ($width ? $width : 'unset')};
  padding: ${({ $padding }) => ($padding ? $padding : 'inherit')};
`;
