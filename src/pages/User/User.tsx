import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../../store';
import { useEffect, useState } from 'react';
import { UserTypes } from '../../types/dataTypes';
import UserForm from '../../components/Organisms/UserForm/UserForm';

const UserView = () => {
  const { uuid } = useParams();
  const { data: users = [] } = useGetUsersQuery();
  const [userData, setUserData] = useState<UserTypes | undefined>(undefined);

  useEffect(() => {
    setUserData(users.find((user) => user.uuid === uuid) as UserTypes);
  }, [users, uuid]);

  return (
    <>{userData ? <UserForm user={userData} uuid={uuid as string} /> : null}</>
  );
};

export default UserView;
