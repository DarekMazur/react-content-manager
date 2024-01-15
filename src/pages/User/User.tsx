import { useParams } from 'react-router-dom';
import { RootState, useGetUsersQuery } from '../../store';
import { UserTypes } from '../../types/dataTypes';
import UserForm from '../../components/Organisms/UserForm/UserForm';
import { useSelector } from 'react-redux';

const UserView = () => {
  const { uuid } = useParams();
  const { data: users = [], isLoading } = useGetUsersQuery();
  const currentUser = useSelector<RootState>((state) => state.user);

  return (
    <>
      {users.length > 0 && !isLoading ? (
        (currentUser as UserTypes).uuid === uuid ||
        (currentUser as UserTypes).role.type === 'admin' ||
        (currentUser as UserTypes).role.type === 'redactor' ? (
          <UserForm uuid={uuid as string} />
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
