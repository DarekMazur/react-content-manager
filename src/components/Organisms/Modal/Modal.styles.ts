import styled from 'styled-components';

export const StyledModal = styled.section<{ $error: boolean }>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.darkBluePopup};
  z-index: 10;

  div {
    position: relative;
    width: 30%;
    min-width: 50rem;
    border-radius: 1rem;
    padding: 3rem;
    background-color: ${({ theme }) => theme.colors.white};

    svg {
      font-size: ${({ theme }) => theme.fontSize.m};
      position: absolute;
      width: 3rem;
      height: 3rem;
      top: 2rem;
      right: 2rem;
      cursor: pointer;
      transform: rotate(0);
      transition: transform 300ms ease-in-out;

      &:hover {
        transform: rotate(180deg);
      }
    }

    p {
      color: ${({ theme, $error }) => ($error ? theme.colors.red : 'inherit')};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }
  }
`;
