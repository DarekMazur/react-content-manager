import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { StyledModal } from './Modal.styles.ts';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const actionResult = () => {
    if (isSuccess) {
      return <p>{t('modal.success', { element: dataType })}</p>;
    }
    if (isError) {
      return <p>{t('modal.error')}</p>;
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
