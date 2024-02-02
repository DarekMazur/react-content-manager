import Heading from '../../components/Atoms/Heading/Heading';
import { RootState, useGetUsersQuery } from '../../store';
import TableWrapper from '../../components/Organisms/TableComponents/TableWrapper/TableWrapper';
import { UserTypes } from '../../types/dataTypes';
import MultiAction from '../../components/Molecules/MultiAction/MultiAction';
import { useSelector } from 'react-redux';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import { Main } from '../../components/Organisms/Main/Main.styles';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';
import { useTranslation } from 'react-i18next';

const Users = () => {
  const { t } = useTranslation();
  const { data: users = [], isLoading } = useGetUsersQuery();
  const height = useMinHeight();
  const selectedUsers = useSelector<RootState>((state) => state.selectedUsers);

  const usersTableHeaders = [
    '',
    t('user.tableHeaders.id'),
    t('user.tableHeaders.name'),
    t('user.tableHeaders.email'),
    t('user.tableHeaders.confirmed'),
    t('user.tableHeaders.blocked'),
    t('user.tableHeaders.role'),
    '',
  ];

  if (users.length === 0) return null;

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Main $minHeight={height}>
      <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
        {t('user.header')}
      </Heading>
      {(selectedUsers as UserTypes[]).length > 0 ? (
        <MultiAction counter={(selectedUsers as UserTypes[]).length} />
      ) : null}
      <TableWrapper content={users} headers={usersTableHeaders} />
    </Main>
  );
};

export default Users;
