import { FC } from 'react';
import { FormWrapper } from '../../Organisms/Forms/UserForm/UserForm.styles.ts';
import ImageInput from '../ImageInput/ImageInput.tsx';
import { StyledImageControler } from './ImageControler.styles.ts';

interface ImageControlerTypes {
  image: File[];
  defaultImage: string;
  altText: string;
  imageUrl: string;
  uuid?: string;
  isRounded?: boolean;
  // eslint-disable-next-line no-unused-vars
  onFilesChange(selectedFilies: File[]): void;
}

const ImageControler: FC<ImageControlerTypes> = ({
  isRounded,
  image,
  defaultImage,
  altText,
  imageUrl,
  uuid,
  onFilesChange,
}) => {
  return (
    <FormWrapper $gap={1.5} $direction="column">
      <StyledImageControler $isRounded={isRounded}>
        <img src={image.length === 0 ? defaultImage : imageUrl} alt={altText} />
      </StyledImageControler>
      <ImageInput uuid={uuid} onFilesChange={onFilesChange} />
    </FormWrapper>
  );
};

export default ImageControler;
