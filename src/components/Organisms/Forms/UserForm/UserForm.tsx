import { useDispatch, useSelector } from 'react-redux';
import {
  FormButton,
  FormButtonWrapper,
  FormWrapper,
  StyledUserForm,
} from './UserForm.styles';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import {
  RootState,
  setUser,
  useGetUsersQuery,
  useUpdateUserMutation,
} from '../../../../store';
import { UserTypes } from '../../../../types/dataTypes';
import { roles } from '../../../../mocks/db';
import { Loading } from '../../../Atoms/Loading/Loading.styles';
import Modal from '../../Modal/Modal';
import ImageController from '../../../Molecules/ImageControler/ImageController.tsx';
import Input from '../../../Molecules/Input/Input';
import InputCheckbox from '../../../Molecules/InputCheckbox/InputCheckbox';
import InputSelect from '../../../Molecules/InputSelect/InputSelect';

const UserForm = ({ uuid }: { uuid: string }) => {
  const navigate = useNavigate();
  const { data: users = [], isLoading } = useGetUsersQuery();
  const currentUser = useSelector<RootState>((state) => state.user);
  const [updateUser, { status, isSuccess, isLoading: loadingUpdate }] =
    useUpdateUserMutation();
  const dispatch = useDispatch();

  const [image, setImage] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [userData, setUserData] = useState<UserTypes | undefined>(undefined);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    image.length > 0 && setImageUrl(URL.createObjectURL(image[0]));
  }, [image]);

  useEffect(() => {
    if (imageUrl && userData) {
      const updateUser: UserTypes = { ...userData };
      updateUser.avatar = imageUrl;
      setUserData({ ...(updateUser as UserTypes) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  useEffect(() => {
    setUserData(users.find((user) => user.uuid === uuid) as UserTypes);
  }, [users, uuid]);

  useEffect(() => {
    if (loadingUpdate) {
      setModal(true);
    }
  }, [loadingUpdate]);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldType: keyof UserTypes,
  ) => {
    if (userData) {
      const updateUser: UserTypes = { ...userData };
      if (fieldType === 'role') {
        const newRole = roles.find((role) => role.name === e.target.value);
        updateUser[fieldType] = newRole || userData?.role;
        setUserData({ ...(updateUser as UserTypes) });
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        updateUser[fieldType] =
          e.target.type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : e.target.value;
        setUserData({ ...(updateUser as UserTypes) });
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateUser({ ...userData });
    if (userData && userData.uuid === (currentUser as UserTypes).uuid) {
      dispatch(setUser({ ...userData, isAuthorised: true }));
    }
  };

  const handleCancel = () => {
    setUserData(users.find((user) => user.uuid === uuid) as UserTypes);
    setImage([]);
    navigate(-1);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  if (!userData) return null;

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <>
      {modal ? (
        <Modal
          isSuccess={isSuccess}
          isError={status === 'rejected'}
          handleCloseModal={handleCloseModal}
          dataType="User"
        />
      ) : null}
      <StyledUserForm onSubmit={handleSubmit} onReset={handleCancel}>
        <ImageController
          image={image}
          defaultImage={userData.avatar}
          altText={userData.username}
          imageUrl={imageUrl as string}
          uuid={uuid}
          isRounded
          onFilesChange={(selectedFiles) => setImage(selectedFiles)}
        />
        <FormWrapper $direction="column" $gap={1.5} $minWidth={30}>
          <Input
            label="Name:"
            type="text"
            id="username"
            value={userData.username}
            uuid={uuid}
            handleOnChange={(e) => handleOnChange(e, 'username')}
          />
          <Input
            label="Email:"
            type="email"
            id="email"
            value={userData.email}
            uuid={uuid}
            handleOnChange={(e) => handleOnChange(e, 'email')}
          />
          <InputCheckbox
            label="Confirmed:"
            id="confirmed"
            value={userData.confirmed}
            uuid={uuid}
            handleOnChange={(e) => handleOnChange(e, 'confirmed')}
          />
          <InputCheckbox
            label="Blocked:"
            id="blocked"
            value={userData.blocked}
            uuid={uuid}
            handleOnChange={(e) => handleOnChange(e, 'blocked')}
          />
          <InputSelect
            value={userData.role}
            handleOnChange={(e) => handleOnChange(e, 'role')}
            uuid={uuid}
            options={['Administrator', 'Redactor', 'Creator', 'Authenticated']}
          />
          <FormButtonWrapper>
            <FormButton $type="submit" type="submit">
              <FontAwesomeIcon icon={['fas', 'edit']} /> Save
            </FormButton>
            <FormButton $type="reset" type="reset">
              <FontAwesomeIcon icon={['fas', 'xmark']} /> Cancel
            </FormButton>
          </FormButtonWrapper>
        </FormWrapper>
      </StyledUserForm>
    </>
  );
};

export default UserForm;