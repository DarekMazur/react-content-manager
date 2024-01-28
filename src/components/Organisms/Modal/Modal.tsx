import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { StyledModal } from './Modal.styles.ts';

interface ModalTypes {
  handleCloseModal: () => void;
  isSuccess: boolean;
  isError: boolean;
  dataType: string;
}

const Modal: FC<ModalTypes> = ({
  handleCloseModal,
  isSuccess,
  isError,
  dataType,
}) => {
  const actionResult = () => {
    if (isSuccess) {
      return <p>{dataType} updated successfully!</p>;
    }
    if (isError) {
      return <p>Something goes wrong</p>;
    }
  };

  return (
    <StyledModal $error={isError}>
      <div>
        <FontAwesomeIcon icon={['fas', 'xmark']} onClick={handleCloseModal} />
        {actionResult()}
      </div>
    </StyledModal>
  );
};

export default Modal;
