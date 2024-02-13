import styled from 'styled-components';

interface IStyledLangButtonTypes {
  $opacity?: boolean;
}
export const StyledLanguageButton = styled.button<IStyledLangButtonTypes>`
  background: transparent;
  border: none;

  img {
    width: 2rem;
    height: 2rem;
    //opacity: 0.6;
    opacity: ${({ $opacity }) => ($opacity ? 1 : 0.6)};
    transition: opacity 200ms ease;

    &:hover {
      opacity: 1;
    }
  }
`;
