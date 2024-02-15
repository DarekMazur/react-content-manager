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
  useGetCategoriesQuery,
} from '../../../store';
import { styled } from 'styled-components';
import { StyledInLink } from '../../Atoms/InLink/InLink.styles.ts';
import {
  IArticleDataTypes,
  ICategoriesTypes,
  IUserTypes,
} from '../../../types/dataTypes.ts';
import { useLocation } from 'react-router';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Loading } from '../../Atoms/Loading/Loading.styles.ts';

interface IActionIconsTypes {
  $disabled?: boolean;
}

const ActionIcon = styled(StyledInLink)<IActionIconsTypes>`
  margin: 0 1rem;
  cursor: pointer;
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.grey : 'inherit'};

  &:hover {
    color: ${({ theme, $disabled }) =>
      $disabled ? theme.colors.grey : 'inherit'};
  }
`;

interface ITableActionProps {
  id: number;
  uuid?: string;
}

const TableActionIcons: FC<ITableActionProps> = ({ id, uuid }) => {
  const { data: articles = [], isLoading: articlesLoading } =
    useGetArticlesQuery();
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const currentUser = useSelector<RootState>((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const article = (articles as IArticleDataTypes).data.find(
    (article) => article.id === id,
  );

  const user = (users as IUserTypes[]).find((user) => user.id === id);

  const category = (categories as ICategoriesTypes[]).find(
    (category) => category.id === id,
  );

  const handleDelete = (id: number, type: string) => {
    if (
      (currentUser as IUserTypes).id !== id ||
      location.pathname !== '/users'
    ) {
      dispatch(clearSelected());
      switch (type) {
        case 'articles':
          return dispatch(
            switchPopup({
              isOpen: true,
              ids: [id],
              title: article ? article.attributes.title : undefined,
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
        case 'categories':
          return dispatch(
            switchPopup({
              isOpen: true,
              ids: [id],
              title: category ? category.title : undefined,
            }),
          );
      }
    }
  };

  if (articlesLoading || usersLoading || categoriesLoading) {
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
      {(currentUser as IUserTypes).id === id &&
      location.pathname === '/users' ? (
        <Tippy
          content={<span>You can't delete yourself</span>}
          animation={'fade'}
          theme={'material'}
          trigger={'click'}
        >
          <ActionIcon
            as={FontAwesomeIcon}
            onClick={() => handleDelete(id, location.pathname.slice(1))}
            icon={['fas', 'trash']}
            $disabled={(currentUser as IUserTypes).id === id}
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
