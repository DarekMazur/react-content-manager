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
  useGetRolesQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} from '../../../../store';
import { Loading } from '../../../Atoms/Loading/Loading.styles';
import Modal from '../../Modal/Modal';
import ImageController from '../../../Molecules/ImageControler/ImageController.tsx';
import Input from '../../../Molecules/Input/Input';
import InputCheckbox from '../../../Molecules/InputCheckbox/InputCheckbox';
import InputSelect from '../../../Molecules/InputSelect/InputSelect';
import { useTranslation } from 'react-i18next';
import { IStrapiUser } from '../../../../types/userTypes.ts';
import userIcon from '../../../../assets/user.png';
import { IRoleTypes } from '../../../../types/roleTypes.ts';
import Uploading from '../../../Atoms/Uploading/Uploading.tsx';
import FormErrorMessage from '../../../Atoms/FormErrorMessage/FormErrorMessage.tsx';

const UserForm = ({ uuid }: { uuid: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: users, isLoading } = useGetUsersQuery();
  const { data: roles } = useGetRolesQuery();
  const [updateUser, { status, isSuccess, isLoading: loadingUpdate }] =
    useUpdateUserMutation();
  const currentUser = useSelector<RootState>((state) => state.user);

  const [image, setImage] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [userData, setUserData] = useState<IStrapiUser | undefined>(undefined);
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [initialUser, setInitialUser] = useState<IStrapiUser | null>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    image.length > 0 && setImageUrl(URL.createObjectURL(image[0]));
  }, [image]);

  useEffect(() => {
    if (imageUrl && userData) {
      const fetchImage = async () => {
        setDisabled(true);
        setImageLoading(true);
        const myImage = await fetch(imageUrl);
        const myBlob = await myImage.blob();

        const formData = new FormData();
        formData.append('files', myBlob, imageUrl);

        await fetch(`${import.meta.env.VITE_API_URL}upload`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const file = { ...data[0] };
            const updateUser: IStrapiUser = {
              ...userData,
              avatar: file,
            };
            // updateUser.avatar = file;
            setUserData({ ...(updateUser as IStrapiUser) });
            setDisabled(false);
            setImageLoading(false);
          });
      };
      // noinspection JSIgnoredPromiseFromCall
      fetchImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  useEffect(() => {
    if (users) {
      setUserData(users.find((user) => user.uuid === uuid) as IStrapiUser);
      setInitialUser(users.find((user) => user.uuid === uuid) as IStrapiUser);
      if (
        userData &&
        users.filter((user) => user.uuid === (userData as IStrapiUser).uuid)
          .length === 0
      ) {
        navigate(-1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, uuid]);

  useEffect(() => {
    if (loadingUpdate) {
      setModal(true);
    }
  }, [loadingUpdate]);

  useEffect(() => {
    if (
      userData?.blocked === initialUser?.blocked &&
      userData?.confirmed === initialUser?.confirmed &&
      JSON.stringify(userData?.avatar) ===
        JSON.stringify(initialUser?.avatar) &&
      userData?.role.id === initialUser?.role.id &&
      userData?.email === initialUser?.email &&
      userData?.username === initialUser?.username
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldType: keyof IStrapiUser,
  ) => {
    if (userData && roles) {
      const updateUser: IStrapiUser = { ...userData };
      if (fieldType === 'role') {
        const newRole = (roles as IRoleTypes).roles.find(
          (role) => role.name === e.target.value,
        );
        updateUser[fieldType] = newRole || userData?.role;
        setUserData({ ...(updateUser as IStrapiUser) });
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        updateUser[fieldType] =
          e.target.type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : e.target.value;
        setUserData({ ...(updateUser as IStrapiUser) });
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userData?.username) {
      return setErrorMessage(
        userData?.email
          ? t('user.form.message.missingName')
          : t('user.form.message.missing'),
      );
    }

    if (!userData?.email) {
      return setErrorMessage(t('user.form.message.missingEmail'));
    }

    if (disabled) {
      return setErrorMessage(t('user.form.message.noChanges'));
    }

    const dataToUpdate = {
      id: userData?.id,
      username: userData?.username,
      avatar: userData?.avatar,
      email: userData?.email,
      confirmed: userData?.confirmed,
      blocked: userData?.blocked,
      newRole: userData?.role,
      role:
        users && users.filter((user) => user.uuid === userData?.uuid)[0].role,
    };

    updateUser(dataToUpdate);
    if (userData && userData.uuid === (currentUser as IStrapiUser).uuid) {
      dispatch(setUser({ ...userData, isAuthorised: true }));
    }
  };

  const handleCancel = () => {
    setUserData(users!.find((user) => user.uuid === uuid) as IStrapiUser);
    setImage([]);
    navigate(-1);
  };

  const handleDelete = () => {
    dispatch(
      switchPopup({
        isOpen: true,
        ids: [(userData as IStrapiUser).id],
        title: (userData as IStrapiUser).username,
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
        {imageLoading ? (
          <Uploading />
        ) : (
          <ImageController
            image={image}
            defaultImage={userData.avatar ? userData.avatar.url : userIcon}
            altText={userData.username}
            imageUrl={imageUrl as string}
            uuid={uuid}
            isRounded
            onFilesChange={(selectedFiles) => setImage(selectedFiles)}
          />
        )}

        <FormWrapper $direction="column" $gap={1.5} $minWidth={30}>
          <Input
            label={t('user.form.name')}
            type="text"
            id="username"
            required
            value={userData.username}
            uuid={uuid}
            handleOnChange={(e) => handleOnChange(e, 'username')}
          />
          <Input
            label={t('user.form.email')}
            type="email"
            id="email"
            value={userData.email}
            required
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
          {roles ? (
            <InputSelect
              value={userData.role}
              label={t('user.form.role')}
              handleOnChange={(e) => handleOnChange(e, 'role')}
              uuid={uuid}
              options={roles!.roles
                .filter((role) => role.type !== 'public')
                .map((role) => role.name)}
            />
          ) : null}
          <FormErrorMessage message={errorMessage} />
          <FormButtonWrapper>
            <EditButtonsWrapper>
              <FormButton $type="submit" type="submit" disabled={disabled}>
                <FontAwesomeIcon icon={['fas', 'edit']} />{' '}
                {t('form.saveButton')}
              </FormButton>
              <FormButton $type="reset" type="reset">
                <FontAwesomeIcon icon={['fas', 'xmark']} />{' '}
                {t('form.cancelButton')}
              </FormButton>
            </EditButtonsWrapper>
            {(currentUser as IStrapiUser).uuid !== userData.uuid && (
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
