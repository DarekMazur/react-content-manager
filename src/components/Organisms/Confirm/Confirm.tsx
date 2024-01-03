import styled from 'styled-components';

export const PopupWrapepr = styled.div`
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
    border-radius: 5px;
    width: 30%;
    position: relative;
  }
`;

const Confirm = () => {
  return (
    <PopupWrapepr>
      <div>
        <p>Are you sure you? This is permanent</p>
        <button>delete</button>
        <button>cancel</button>
      </div>
    </PopupWrapepr>
  );
};

export default Confirm;
