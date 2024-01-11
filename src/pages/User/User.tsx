import { useParams } from 'react-router-dom';
import {
  RootState,
  setUser,
  useGetUsersQuery,
  useUpdateUserMutation,
} from '../../store';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { UserTypes } from '../../types/dataTypes';
import { roles } from '../../mocks/db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

const UserView = () => {
  const { uuid } = useParams();
  const { data: users = [] } = useGetUsersQuery();
  const currentUser = useSelector<RootState>((state) => state.user);

  const [userData, setUserData] = useState<UserTypes | undefined>(undefined);
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();

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

  return (
    <>
      {userData ? (
        <form onSubmit={handleSubmit}>
          <div>
            <img
              src={userData.avatar}
              alt={`${userData.username} avatar`}
              style={{ width: '15rem' }}
            />
          </div>
          <div>
            <label htmlFor="username">Name: </label>
            <input
              type="text"
              value={userData.username}
              id="username"
              onChange={(e) => handleOnChange(e, 'username')}
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              value={userData.email}
              id="email"
              onChange={(e) => handleOnChange(e, 'email')}
            />
          </div>
          <div>
            <label htmlFor="confirmed">Confirmed: </label>
            <input
              type="checkbox"
              id="confirmed"
              checked={userData.confirmed}
              onChange={(e) => handleOnChange(e, 'confirmed')}
            />
          </div>
          <div>
            <label htmlFor="blocked">Blocked: </label>
            <input
              type="checkbox"
              id="blocked"
              checked={userData.blocked}
              onChange={(e) => handleOnChange(e, 'blocked')}
            />
          </div>
          <div>
            <label htmlFor="role">Role: </label>
            <select
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
          <button type="submit">
            <FontAwesomeIcon icon={['fas', 'edit']} /> Edit
          </button>
        </form>
      ) : null}
    </>
  );
};

export default UserView;
