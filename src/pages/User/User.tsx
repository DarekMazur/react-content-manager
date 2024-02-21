import { useParams } from 'react-router-dom';
import { RootState, useGetUsersQuery } from '../../store';
import UserForm from '../../components/Organisms/Forms/UserForm/UserForm';
import { useSelector } from 'react-redux';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import UnauthorisedView from '../UnauthorisedView/UnauthorisedView.tsx';
import { IStrapiUser } from '../../types/userTypes.ts';

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
        (currentUser as IStrapiUser).uuid === uuid ||
        (currentUser as IStrapiUser).role.type === 'administrator' ||
        (currentUser as IStrapiUser).role.type === 'redactor' ? (
          <UserForm uuid={uuid as string} />
        ) : (
          <UnauthorisedView />
        )
      ) : null}
    </>
  );
};

export default UserView;
