import styled from 'styled-components';

interface IStyledLinkProps {
  size?: string;
}

export const StyledLink = styled.a<IStyledLinkProps>`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme, size }) => (size ? theme.fontSize[size] : 'inherit')};
`;
