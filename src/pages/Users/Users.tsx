import { useEffect, useState } from 'react';
import { getFooterHeight } from '../../utils/methods/getFooterHeight';
import Heading from '../../components/Atoms/Heading/Heading';
import { RootState, useGetUsersQuery } from '../../store';
import TableWrapper from '../../components/Organisms/TableWrapper/TableWrapper';
import { usersTableHeaders } from '../../utils/data';
import { UserTypes } from '../../types/dataTypes';
import MultiAction from '../../components/Molecules/MultiAction/MultiAction';
import { useSelector } from 'react-redux';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import { Main } from '../../components/Organisms/Main/Main.styles';

const Users = () => {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const selectedUsers = useSelector<RootState>((state) => state.selectedUsers);

  useEffect(() => {
    setWrapperHeight(getFooterHeight() + 50);
  }, []);

  if (users.length === 0) return null;

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Main $minHeight={window.innerHeight - wrapperHeight}>
      <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
        Users
      </Heading>
      {(selectedUsers as UserTypes[]).length > 0 ? (
        <MultiAction counter={(selectedUsers as UserTypes[]).length} />
      ) : null}
      <TableWrapper content={users} headers={usersTableHeaders} />
    </Main>
  );
};

export default Users;
