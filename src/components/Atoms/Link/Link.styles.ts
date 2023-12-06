import styled from 'styled-components';

interface StyledLinkProps {
  size?: string;
}

export const StyledLink = styled.a<StyledLinkProps>`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme, size }) => (size ? theme.fontSize[size] : 'inherit')};
`;
