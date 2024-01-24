import styled from 'styled-components';

export const Main = styled.main<{ $minHeight: number }>`
  padding-bottom: 11rem;
  min-height: ${({ $minHeight }) => `calc(100vh - ${$minHeight}px`};
`;
