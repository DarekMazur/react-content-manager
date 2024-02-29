import styled from 'styled-components';

export const Italic = styled.p`
  color: ${({ theme }) => theme.colors.red};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-style: italic;
`;
