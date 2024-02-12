import { useParams } from 'react-router-dom';
import { RootState, useGetUsersQuery } from '../../store';
import { IUserTypes } from '../../types/dataTypes';
import UserForm from '../../components/Organisms/Forms/UserForm/UserForm';
import { useSelector } from 'react-redux';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import UnauthorisedView from '../UnauthorisedView/UnauthorisedView.tsx';

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
        (currentUser as IUserTypes).uuid === uuid ||
        (currentUser as IUserTypes).role.type === 'admin' ||
        (currentUser as IUserTypes).role.type === 'redactor' ? (
          <UserForm uuid={uuid as string} />
        ) : (
          <UnauthorisedView />
        )
      ) : null}
    </>
  );
};

export default UserView;
