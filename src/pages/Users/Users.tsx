import { useEffect, useState } from 'react';
import { getFooterHeight } from '../../utils/methods/getFooterHeight';
import Heading from '../../components/Atoms/Heading/Heading';
import { useGetUsersQuery } from '../../store';
import TableWrapper from '../../components/Organisms/TableWrapper/TableWrapper';
import { usersTableHeaders } from '../../utils/data';

const Users = () => {
  const { data: users = [] } = useGetUsersQuery();
  const [wrapperHeight, setWrapperHeight] = useState(0);

  useEffect(() => {
    setWrapperHeight(getFooterHeight() + 50);
  }, []);

  if (users.length === 0) return null;

  return (
    <main
      style={{
        paddingBottom: '11rem',
        minHeight: `calc(100vh - ${wrapperHeight}px)`,
      }}
    >
      <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
        Users
      </Heading>
      <TableWrapper content={users} headers={usersTableHeaders} />
    </main>
  );
};

export default Users;
