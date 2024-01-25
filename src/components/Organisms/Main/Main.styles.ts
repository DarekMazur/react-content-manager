import styled from 'styled-components';

interface MainTypes {
  $minHeight: number;
}

export const Main = styled.main<MainTypes>`
  padding-bottom: 11rem;
  min-height: ${({ $minHeight }) => `${$minHeight}px`};
`;
