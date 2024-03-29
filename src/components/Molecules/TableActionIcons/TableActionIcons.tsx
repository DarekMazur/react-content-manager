import { FC, useEffect, useState } from 'react';
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
import { useLocation } from 'react-router';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Loading } from '../../Atoms/Loading/Loading.styles.ts';
import {
  IArticleData,
  IArticlesDataTypes,
} from '../../../types/articleTypes.ts';
import { IStrapiUser, IUserData } from '../../../types/userTypes.ts';
import { ICategoryData } from '../../../types/categoryTypes.ts';

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
  const { data: articles, isLoading: articlesLoading } = useGetArticlesQuery();
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const currentUser = useSelector<RootState>((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const [category, setCategory] = useState<ICategoryData | null>();
  const [user, setUser] = useState<IStrapiUser | null>();
  const [article, setArticle] = useState<IArticleData | null>();

  useEffect(() => {
    if (categories) {
      const actionCategory = categories.data.find(
        (category) => category.id === id,
      );
      if (actionCategory) {
        setCategory(actionCategory);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  useEffect(() => {
    if (users) {
      const actionUser = users.find((user) => user.uuid === uuid);
      if (actionUser) {
        setUser(actionUser);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (articles) {
      const actionArticle = (articles as IArticlesDataTypes).data.find(
        (article) => article.id === id,
      );

      setArticle(actionArticle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles]);

  const handleDelete = (id: number, type: string) => {
    if (
      (currentUser as IUserData).id !== id ||
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
              title: category ? category.attributes.title : undefined,
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
      {(currentUser as IUserData).id === id &&
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
            $disabled={(currentUser as IUserData).id === id}
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
