import { ChangeEvent, FC } from 'react';
import { FormWrapper } from '../../Organisms/UserForm/UserForm.styles';

interface ImageTypes {
  // eslint-disable-next-line no-unused-vars
  onFilesChange(file: File[]): void;
}

const ImageInput: FC<ImageTypes> = ({ onFilesChange }) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      onFilesChange([...file]);
    }
  };

  return (
    <FormWrapper $direction="column" $gap={0.8}>
      <label htmlFor="avatar">Upload your picture:</label>
      <input
        type="file"
        id="avatar"
        accept="image/*"
        onChange={handleImageChange}
      />
    </FormWrapper>
  );
};

export default ImageInput;
