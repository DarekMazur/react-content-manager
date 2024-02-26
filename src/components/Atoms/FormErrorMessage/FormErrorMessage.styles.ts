import styled from 'styled-components';

export const StyledFormErrorMessage = styled.div<{ $left?: boolean }>`
  text-align: ${({ $left }) => ($left ? 'start' : 'end')};
  color: ${({ theme }) => theme.colors.red};
`;
