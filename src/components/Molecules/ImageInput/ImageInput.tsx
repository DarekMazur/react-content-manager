import { ChangeEvent, FC } from 'react';
import { FormWrapper } from '../../Organisms/Forms/UserForm/UserForm.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { IUserTypes } from '../../../types/dataTypes';
import { useTranslation } from 'react-i18next';

interface IImageTypes {
  uuid?: string;
  // eslint-disable-next-line no-unused-vars
  onFilesChange(file: File[]): void;
}

const ImageInput: FC<IImageTypes> = ({ uuid, onFilesChange }) => {
  const { t } = useTranslation();
  const currentUser = useSelector<RootState>((state) => state.user);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      onFilesChange([...file]);
    }
  };

  return (
    <FormWrapper $direction="column" $gap={0.8}>
      <label htmlFor="avatar">{t('form.pictureUpload')}</label>
      <input
        type="file"
        id="avatar"
        accept="image/*"
        onChange={handleImageChange}
        disabled={
          (currentUser as IUserTypes).uuid !== uuid &&
          (currentUser as IUserTypes).role.type !== 'admin'
        }
      />
    </FormWrapper>
  );
};

export default ImageInput;
