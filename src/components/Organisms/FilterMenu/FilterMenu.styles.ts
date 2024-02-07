import styled from 'styled-components';

interface IStyledFilterTypes {
  $open: boolean;
}
export const StyledFilterMenu = styled.aside<IStyledFilterTypes>`
  width: 25rem;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  padding: 1rem;
  margin: 0;
  border-radius: 0 0.5rem 0.5rem 0;
  position: fixed;
  z-index: 3;
  left: -25rem;
  transform: ${({ $open }) => ($open ? 'translateX(25rem)' : 'translateX(0)')};
  transition: transform 300ms ease-in-out;
  box-shadow: 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.15);
`;

export const FiltersLabel = styled.div`
  position: absolute;
  top: 5rem;
  left: 25rem;
  background-color: lightblue;
  border-radius: 0 0 0.5rem 0.5rem;
  margin: 0;
  padding: 0.2rem 2rem 0.5rem;
  transform-origin: 0 0;
  transform: rotate(-90deg) translateX(-100%);
  box-shadow: -0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.15);
  cursor: pointer;
`;
