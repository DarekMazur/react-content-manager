import { useParams } from 'react-router-dom';
import { RootState, useGetUsersQuery } from '../../store';
import { useEffect, useState } from 'react';
import { UserTypes } from '../../types/dataTypes';
import UserForm from '../../components/Organisms/UserForm/UserForm';
import { useSelector } from 'react-redux';

const UserView = () => {
  const { uuid } = useParams();
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [userData, setUserData] = useState<UserTypes | undefined>(undefined);
  const currentUser = useSelector<RootState>((state) => state.user);

  useEffect(() => {
    setUserData(users.find((user) => user.uuid === uuid) as UserTypes);
  }, [users, uuid]);

  return (
    <>
      {userData && !isLoading ? (
        (currentUser as UserTypes).uuid === uuid ||
        (currentUser as UserTypes).role.type === 'admin' ? (
          <UserForm user={userData} uuid={uuid as string} />
        ) : (
          "You're not authorised"
        )
      ) : (
        'Loading...'
      )}
    </>
  );
};

export default UserView;
