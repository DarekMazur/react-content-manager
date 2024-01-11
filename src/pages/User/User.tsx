import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../../store';
import { ChangeEvent, useEffect, useState } from 'react';
import { UserTypes } from '../../types/dataTypes';
import { roles } from '../../mocks/db';

const UserView = () => {
  const { uuid } = useParams();
  const { data: users = [] } = useGetUsersQuery();

  const [user, setUser] = useState<UserTypes | undefined>(undefined);

  useEffect(() => {
    setUser(users.find((user) => user.uuid === uuid) as UserTypes);
  }, [users, uuid]);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldType: keyof UserTypes,
  ) => {
    if (user) {
      const updateUser: UserTypes = { ...user };
      if (fieldType === 'role') {
        const newRole = roles.find((role) => role.name === e.target.value);
        updateUser[fieldType] = newRole || user?.role;
        setUser({ ...(updateUser as UserTypes) });
      } else {
        updateUser[fieldType] =
          e.target.type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : e.target.value;
      }
    }
  };

  return (
    <>
      {user ? (
        <form>
          <div>
            <img
              src={user.avatar}
              alt={`${user.username} avatar`}
              style={{ width: '15rem' }}
            />
          </div>
          <div>
            <label htmlFor="username">Name: </label>
            <input
              type="text"
              value={user.username}
              id="username"
              onChange={(e) => handleOnChange(e, 'username')}
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              value={user.email}
              id="email"
              onChange={(e) => handleOnChange(e, 'email')}
            />
          </div>
          <div>
            <label htmlFor="confirmed">Confirmed: </label>
            <input
              type="checkbox"
              id="confirmed"
              checked={user.confirmed}
              onChange={(e) => handleOnChange(e, 'confirmed')}
            />
          </div>
          <div>
            <label htmlFor="blocked">Blocked: </label>
            <input
              type="checkbox"
              id="blocked"
              checked={user.blocked}
              onChange={(e) => handleOnChange(e, 'blocked')}
            />
          </div>
          <div>
            <label htmlFor="role">Role: </label>
            <select
              name="role"
              id="role"
              value={user.role.name}
              onChange={(e) => handleOnChange(e, 'role')}
            >
              <option value="Administrator">Administrator</option>
              <option value="Redactor">Redactor</option>
              <option value="Creator">Creator</option>
              <option value="Authenticated">Authenticated</option>
            </select>
          </div>
        </form>
      ) : null}
    </>
  );
};

export default UserView;
