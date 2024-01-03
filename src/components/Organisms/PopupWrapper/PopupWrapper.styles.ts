import styled from 'styled-components';

export const PopupWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.darkBluePopup};
  z-index: 10;

  div {
    padding: 4rem 2rem;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 0.5rem;
    width: 30%;
    position: relative;
  }
`;
