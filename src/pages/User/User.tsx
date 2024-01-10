import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../../store';
import { useEffect, useState } from 'react';
import { UserTypes } from '../../types/dataTypes';

const UserView = () => {
  const { uuid } = useParams();
  const { data: users = [] } = useGetUsersQuery();

  const [user, setUser] = useState<UserTypes | undefined>(undefined);

  useEffect(() => {
    setUser(users.find((user) => user.uuid === uuid) as UserTypes);
  }, [users, uuid]);

  return (
    <>
      {user ? (
        <>
          <img
            src={user.avatar}
            alt={`${user.username} avatar`}
            style={{ width: '15rem' }}
          />
          <label htmlFor="name">Name: </label>
          <input type="text" value={user.username} id="name" />
          <label htmlFor="email">Email: </label>
          <input type="email" value={user.email} id="email" />
          <label htmlFor="confirmed">Confirmed: </label>
          <input type="checkbox" id="confirmed" checked={user.confirmed} />
          <label htmlFor="blocked">Blocked: </label>
          <input type="checkbox" id="blocked" checked={user.blocked} />
          <label htmlFor="roles">Role: </label>
          <select name="roles" id="roles" value={user.role.name}>
            <option
              value="Administrator"
              selected={user.role.name === 'Administrator'}
            >
              Administrator
            </option>
            <option value="Redactor">Redactor</option>
            <option value="Creator">Creator</option>
            <option value="Authenticated">Authenticated</option>
          </select>
        </>
      ) : null}
    </>
  );
};

export default UserView;
