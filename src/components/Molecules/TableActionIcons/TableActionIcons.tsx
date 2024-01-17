import { FC } from 'react';
import InLink from '../../Atoms/InLink/InLink.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import {
  clearSelected,
  switchPopup,
  useGetArticlesQuery,
  useGetUsersQuery,
} from '../../../store/index.ts';
import { styled } from 'styled-components';
import { StyledInLink } from '../../Atoms/InLink/InLink.styles.ts';
import { ArticleDataTypes, UserTypes } from '../../../types/dataTypes.ts';
import { useLocation } from 'react-router';

const ActionIcon = styled(StyledInLink)`
  margin: 0 1rem;
  cursor: pointer;
`;

interface TableActionProps {
  id: number;
  uuid?: string;
}

const TableActionIcons: FC<TableActionProps> = ({ id, uuid }) => {
  const { data: articles = [] } = useGetArticlesQuery();
  const { data: users = [] } = useGetUsersQuery();
  const dispatch = useDispatch();
  const location = useLocation();

  const article = (articles as ArticleDataTypes[]).find(
    (article) => article.id === id,
  );

  const user = (users as UserTypes[]).find((user) => user.id === id);

  const handleDelete = (id: number, type: string) => {
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
    }
  };

  return (
    <>
      <InLink
        target={`${location.pathname}/${uuid ? uuid : id}`}
        name={
          <FontAwesomeIcon style={{ margin: '0 1rem' }} icon={['fas', 'pen']} />
        }
      />
      <ActionIcon
        as={FontAwesomeIcon}
        onClick={() => handleDelete(id, location.pathname.slice(1))}
        icon={['fas', 'trash']}
      />
    </>
  );
};

export default TableActionIcons;
