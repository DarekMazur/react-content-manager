import styled from 'styled-components';

interface IPopupProps {
  $isVisible: boolean;
}

export const PopupWrapper = styled.div<IPopupProps>`
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.darkBluePopup};
  z-index: 10;
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};

  div {
    padding: 4rem 2rem;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 0.5rem;
    width: 30%;
    position: relative;

    div {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`;
