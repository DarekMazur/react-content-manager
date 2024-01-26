import { useParams } from 'react-router-dom';
import { RootState, useGetUsersQuery } from '../../store';
import { UserTypes } from '../../types/dataTypes';
import UserForm from '../../components/Organisms/Forms/UserForm/UserForm';
import { useSelector } from 'react-redux';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';

const UserView = () => {
  const { uuid } = useParams();
  const { data: users = [], isLoading } = useGetUsersQuery();
  const currentUser = useSelector<RootState>((state) => state.user);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <>
      {users.length > 0 ? (
        (currentUser as UserTypes).uuid === uuid ||
        (currentUser as UserTypes).role.type === 'admin' ||
        (currentUser as UserTypes).role.type === 'redactor' ? (
          <UserForm uuid={uuid as string} />
        ) : (
          "You're not authorised"
        )
      ) : null}
    </>
  );
};

export default UserView;
