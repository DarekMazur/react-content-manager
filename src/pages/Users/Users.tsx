import Heading from '../../components/Atoms/Heading/Heading';
import { RootState, useGetUsersQuery } from '../../store';
import TableWrapper from '../../components/Organisms/TableComponents/TableWrapper/TableWrapper';
import {
  IFilterElementsTypes,
  IFilterTypes,
  IUserTypes,
} from '../../types/dataTypes';
import MultiAction from '../../components/Molecules/MultiAction/MultiAction';
import { useSelector } from 'react-redux';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import { Main } from '../../components/Organisms/Main/Main.styles';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';
import { useTranslation } from 'react-i18next';
import FilterMenu from '../../components/Organisms/FilterMenu/FilterMenu.tsx';
import { useEffect, useState } from 'react';
import { roles } from '../../mocks/db.ts';

const Users = () => {
  const { t } = useTranslation();
  const { data: users = [], isLoading } = useGetUsersQuery();
  const filters = useSelector<RootState>((state) => state.filters);
  const height = useMinHeight();
  const selectedUsers = useSelector<RootState>((state) => state.selectedUsers);

  const [filteredUsers, setFilteredUsers] = useState<IUserTypes[]>(users);

  const usersFilters: IFilterElementsTypes[] = [
    {
      label: t('filters.users.role'),
      type: 'role',
      elements: roles.map((role) => ({
        label: role.name,
        id: role.type,
      })),
    },
    {
      label: t('filters.users.status'),
      type: 'blocked',
      elements: [
        {
          label: t('filters.users.active'),
          id: 'active',
        },
        {
          label: t('filters.users.blocked'),
          id: 'blocked',
        },
      ],
    },
    {
      label: t('filters.users.confirmStatus'),
      type: 'confirmed',
      elements: [
        {
          label: t('filters.users.confirmed'),
          id: 'confirmed',
        },
        {
          label: t('filters.users.notConfirmed'),
          id: 'notConfirmed',
        },
      ],
    },
  ];

  useEffect(() => {
    if (
      (filters as IFilterTypes[]).filter((filter) => filter.value.length > 0)
        .length > 0
    ) {
      const filteredRoles = (filters as IFilterTypes[]).filter(
        (filter) => filter.type === 'role',
      );
      const filteredStatus = (filters as IFilterTypes[]).filter(
        (filter) => filter.type === 'blocked',
      );
      const filteredConfirmed = (filters as IFilterTypes[]).filter(
        (filter) => filter.type === 'confirmed',
      );

      let filtered: IUserTypes[] = [];

      if (filteredRoles[0] && filteredRoles[0].value.length > 0) {
        filtered.push(
          ...users.filter((user) =>
            filteredRoles[0].value.includes(user.role.type),
          ),
        );
      } else {
        filtered.push(...users);
      }

      if (filteredStatus[0] && filteredStatus[0].value.length > 0) {
        filtered = filtered.filter((user) =>
          filteredStatus[0].value.includes('active')
            ? filteredStatus[0].value.includes('blocked')
              ? user
              : !user.blocked
            : user.blocked,
        );
      }

      if (filteredConfirmed[0] && filteredConfirmed[0].value.length > 0) {
        filtered = filtered.filter((user) =>
          filteredConfirmed[0].value.includes('notConfirmed')
            ? filteredConfirmed[0].value.includes('confirmed')
              ? user
              : !user.confirmed
            : user.confirmed,
        );
      }

      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [filters, users]);

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
      <FilterMenu menuItems={usersFilters} />
      <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
        {t('user.header')}
      </Heading>
      {(selectedUsers as IUserTypes[]).length > 0 ? (
        <MultiAction counter={(selectedUsers as IUserTypes[]).length} />
      ) : null}
      <TableWrapper content={filteredUsers} headers={usersTableHeaders} />
    </Main>
  );
};

export default Users;
