import { FC } from 'react';
import InLink from '../../Atoms/InLink/InLink.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  clearSelected,
  switchPopup,
  useGetArticlesQuery,
  useGetUsersQuery,
} from '../../../store/index.ts';
import { styled } from 'styled-components';
import { StyledInLink } from '../../Atoms/InLink/InLink.styles.ts';
import { ArticleDataTypes, UserTypes } from '../../../types/dataTypes.ts';
import { useLocation } from 'react-router';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Loading } from '../../Atoms/Loading/Loading.styles.ts';

interface ActionIconsTypes {
  $disabled?: boolean;
}

const ActionIcon = styled(StyledInLink)<ActionIconsTypes>`
  margin: 0 1rem;
  cursor: pointer;
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.grey : 'inherit'};

  &:hover {
    color: ${({ theme, $disabled }) =>
      $disabled ? theme.colors.grey : 'inherit'};
  }
`;

interface TableActionProps {
  id: number;
  uuid?: string;
}

const TableActionIcons: FC<TableActionProps> = ({ id, uuid }) => {
  const { data: articles = [], isLoading: articlesLoading } =
    useGetArticlesQuery();
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();
  const currentUser = useSelector<RootState>((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const article = (articles as ArticleDataTypes[]).find(
    (article) => article.id === id,
  );

  const user = (users as UserTypes[]).find((user) => user.id === id);

  const handleDelete = (id: number, type: string) => {
    if ((currentUser as UserTypes).id !== id) {
      dispatch(clearSelected());
      switch (type) {
        case 'articles':
          return dispatch(
            switchPopup({
              isOpen: true,
              ids: [id],
              title: article ? article.title : undefined,
            }),
          );
        case 'users':
          return dispatch(
            switchPopup({
              isOpen: true,
              ids: [id],
              title: user ? user.username : undefined,
            }),
          );
        case 'comments':
          return dispatch(
            switchPopup({
              isOpen: true,
              ids: [id],
              title: undefined,
            }),
          );
      }
    }
  };

  if (articlesLoading || usersLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <>
      <InLink
        target={`${location.pathname}/${uuid ? uuid : id}`}
        name={
          <FontAwesomeIcon style={{ margin: '0 1rem' }} icon={['fas', 'pen']} />
        }
      />
      {(currentUser as UserTypes).id === id ? (
        <Tippy
          content={<span>You can't delete yourself</span>}
          animation={'fade'}
          theme={'meterial'}
          trigger={'click'}
        >
          <ActionIcon
            as={FontAwesomeIcon}
            onClick={() => handleDelete(id, location.pathname.slice(1))}
            icon={['fas', 'trash']}
            $disabled={
              (currentUser as UserTypes).id === id &&
              location.pathname === '/users'
            }
          />
        </Tippy>
      ) : (
        <ActionIcon
          as={FontAwesomeIcon}
          onClick={() => handleDelete(id, location.pathname.slice(1))}
          icon={['fas', 'trash']}
        />
      )}
    </>
  );
};

export default TableActionIcons;
