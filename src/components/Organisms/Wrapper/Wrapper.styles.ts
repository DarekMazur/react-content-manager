import styled from 'styled-components';

interface StyledProps {
  $justify?: string;
  $align?: string;
  $width?: string;
}
export const StyledWrapper = styled.div<StyledProps>`
  display: flex;
  justify-content: ${({ $justify }) => ($justify ? $justify : `unset`)};
  align-items: ${({ $align }) => ($align ? $align : `unset`)};
  gap: 2rem;
  color: ${({ theme }) => theme.colors.darkBlue};
  width: ${({ $width }) => ($width ? $width : 'unset')};
`;
