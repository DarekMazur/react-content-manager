import { useDispatch, useSelector } from 'react-redux';
import { UserTypes } from '../../../types/dataTypes';
import ImageInput from '../../Molecules/ImageInput/ImageInput';
import InputCheckbox from '../../Molecules/InputCheckbox/InputCheckbox';
import Input from '../../Molecules/Input/Input';
import {
  RootState,
  setUser,
  useGetUsersQuery,
  useUpdateUserMutation,
} from '../../../store';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { roles } from '../../../mocks/db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserForm = ({ user, uuid }: { user: UserTypes; uuid: string }) => {
  const { data: users = [] } = useGetUsersQuery();
  const currentUser = useSelector<RootState>((state) => state.user);
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const [image, setImage] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [userData, setUserData] = useState<UserTypes>(user);

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
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleCancel}
      style={{
        display: 'flex',
        gap: '2rem',
        margin: '0 3rem',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div
          style={{
            borderRadius: '50%',
            overflow: 'hidden',
            width: '25rem',
            height: '25rem',
          }}
        >
          <img
            src={image.length === 0 ? userData.avatar : imageUrl}
            alt={`${userData.username} avatar`}
            style={{ width: '25rem' }}
          />
        </div>
        <ImageInput
          onFilesChange={(selectedFilies) => setImage(selectedFilies)}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Input
          label="Name:"
          type="text"
          id="username"
          value={userData.username}
          handleOnChange={(e) => handleOnChange(e, 'username')}
        />
        <Input
          label="Email:"
          type="email"
          id="email"
          value={userData.email}
          handleOnChange={(e) => handleOnChange(e, 'email')}
        />
        <InputCheckbox
          label="Confirmed:"
          id="confirmed"
          value={userData.confirmed}
          handleOnChange={(e) => handleOnChange(e, 'confirmed')}
        />
        <InputCheckbox
          label="Blocked:"
          id="blocked"
          value={userData.blocked}
          handleOnChange={(e) => handleOnChange(e, 'blocked')}
        />
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
        >
          <label htmlFor="role">Role: </label>
          <select
            style={{padding: '1rem', borderRadius: '0.5rem', border: '0.1rem solid'}}
            name="role"
            id="role"
            value={userData.role.name}
            onChange={(e) => handleOnChange(e, 'role')}
          >
            <option value="Administrator">Administrator</option>
            <option value="Redactor">Redactor</option>
            <option value="Creator">Creator</option>
            <option value="Authenticated">Authenticated</option>
          </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <button style={{padding: '1rem', backgroundColor: 'lightBlue'}} type="submit">
            <FontAwesomeIcon icon={['fas', 'edit']} /> Save
          </button>
          <button style={{padding: '1rem', backgroundColor: 'red'}} type="reset">
            <FontAwesomeIcon icon={['fas', 'xmark']} /> Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
