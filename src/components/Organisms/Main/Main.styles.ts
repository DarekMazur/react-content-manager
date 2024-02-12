import styled from 'styled-components';

interface IMainTypes {
  $minHeight: number;
}

export const Main = styled.main<IMainTypes>`
  padding-bottom: 11rem;
  min-height: ${({ $minHeight }) => `${$minHeight}px`};
`;
