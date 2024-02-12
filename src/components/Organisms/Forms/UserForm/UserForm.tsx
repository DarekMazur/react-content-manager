import { useDispatch, useSelector } from 'react-redux';
import {
  EditButtonsWrapper,
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
  switchPopup,
  useGetUsersQuery,
  useUpdateUserMutation,
} from '../../../../store';
import { IUserTypes } from '../../../../types/dataTypes';
import { roles } from '../../../../mocks/db';
import { Loading } from '../../../Atoms/Loading/Loading.styles';
import Modal from '../../Modal/Modal';
import ImageController from '../../../Molecules/ImageControler/ImageController.tsx';
import Input from '../../../Molecules/Input/Input';
import InputCheckbox from '../../../Molecules/InputCheckbox/InputCheckbox';
import InputSelect from '../../../Molecules/InputSelect/InputSelect';
import { useTranslation } from 'react-i18next';

const UserForm = ({ uuid }: { uuid: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: users = [], isLoading } = useGetUsersQuery();
  const currentUser = useSelector<RootState>((state) => state.user);
  const [updateUser, { status, isSuccess, isLoading: loadingUpdate }] =
    useUpdateUserMutation();
  const dispatch = useDispatch();

  const [image, setImage] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [userData, setUserData] = useState<IUserTypes | undefined>(undefined);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    image.length > 0 && setImageUrl(URL.createObjectURL(image[0]));
  }, [image]);

  useEffect(() => {
    if (imageUrl && userData) {
      const updateUser: IUserTypes = { ...userData };
      updateUser.avatar = imageUrl;
      setUserData({ ...(updateUser as IUserTypes) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  useEffect(() => {
    setUserData(users.find((user) => user.uuid === uuid) as IUserTypes);
    if (
      userData &&
      users.filter((user) => user.uuid === (userData as IUserTypes).uuid)
        .length === 0
    ) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, uuid]);

  useEffect(() => {
    if (loadingUpdate) {
      setModal(true);
    }
  }, [loadingUpdate]);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldType: keyof IUserTypes,
  ) => {
    if (userData) {
      const updateUser: IUserTypes = { ...userData };
      if (fieldType === 'role') {
        const newRole = roles.find((role) => role.name === e.target.value);
        updateUser[fieldType] = newRole || userData?.role;
        setUserData({ ...(updateUser as IUserTypes) });
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        updateUser[fieldType] =
          e.target.type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : e.target.value;
        setUserData({ ...(updateUser as IUserTypes) });
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateUser({ ...userData });
    if (userData && userData.uuid === (currentUser as IUserTypes).uuid) {
      dispatch(setUser({ ...userData, isAuthorised: true }));
    }
  };

  const handleCancel = () => {
    setUserData(users.find((user) => user.uuid === uuid) as IUserTypes);
    setImage([]);
    navigate(-1);
  };

  const handleDelete = () => {
    dispatch(
      switchPopup({
        isOpen: true,
        ids: [(userData as IUserTypes).id],
        title: (userData as IUserTypes).username,
      }),
    );
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
          dataType={t('modal.element.user')}
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
            label={t('user.form.name')}
            type="text"
            id="username"
            value={userData.username}
            uuid={uuid}
            handleOnChange={(e) => handleOnChange(e, 'username')}
          />
          <Input
            label={t('user.form.email')}
            type="email"
            id="email"
            value={userData.email}
            uuid={uuid}
            handleOnChange={(e) => handleOnChange(e, 'email')}
          />
          <InputCheckbox
            label={t('user.form.confirmed')}
            id="confirmed"
            value={userData.confirmed}
            uuid={uuid}
            handleOnChange={(e) => handleOnChange(e, 'confirmed')}
          />
          <InputCheckbox
            label={t('user.form.blocked')}
            id="blocked"
            value={userData.blocked}
            uuid={uuid}
            handleOnChange={(e) => handleOnChange(e, 'blocked')}
          />
          <InputSelect
            value={userData.role}
            label={t('user.form.role')}
            handleOnChange={(e) => handleOnChange(e, 'role')}
            uuid={uuid}
            options={['Administrator', 'Redactor', 'Creator', 'Authenticated']}
          />
          <FormButtonWrapper>
            <EditButtonsWrapper>
              <FormButton $type="submit" type="submit">
                <FontAwesomeIcon icon={['fas', 'edit']} />{' '}
                {t('form.saveButton')}
              </FormButton>
              <FormButton $type="reset" type="reset">
                <FontAwesomeIcon icon={['fas', 'xmark']} />{' '}
                {t('form.cancelButton')}
              </FormButton>
            </EditButtonsWrapper>
            {(currentUser as IUserTypes).uuid !== userData.uuid && (
              <FormButton $type="delete" type="button" onClick={handleDelete}>
                <FontAwesomeIcon icon={['fas', 'trash']} />{' '}
                {t('form.deleteButton')}
              </FormButton>
            )}
          </FormButtonWrapper>
        </FormWrapper>
      </StyledUserForm>
    </>
  );
};

export default UserForm;
