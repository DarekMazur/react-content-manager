import { FC } from 'react';
import { FormWrapper } from '../../Organisms/Forms/UserForm/UserForm.styles';
import ImageInput from '../ImageInput/ImageInput';
import { StyledImageControler } from './UserImageControler.styles';

interface UserImageControlerTypes {
  image: File[];
  userAvatar: string;
  username: string;
  imageUrl: string;
  uuid: string;
  // eslint-disable-next-line no-unused-vars
  onFilesChange(selectedFilies: File[]): void;
}

const UserImageControler: FC<UserImageControlerTypes> = ({
  image,
  userAvatar,
  username,
  imageUrl,
  uuid,
  onFilesChange,
}) => {
  return (
    <FormWrapper $gap={1.5} $direction="column">
      <StyledImageControler>
        <img
          src={image.length === 0 ? userAvatar : imageUrl}
          alt={`${username} avatar`}
        />
      </StyledImageControler>
      <ImageInput uuid={uuid} onFilesChange={onFilesChange} />
    </FormWrapper>
  );
};

export default UserImageControler;
