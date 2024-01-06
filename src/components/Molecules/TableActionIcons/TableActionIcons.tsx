import { FC } from 'react';
import InLink from '../../Atoms/InLink/InLink.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import {
  clearSelected,
  switchPopup,
  useGetArticlesQuery,
} from '../../../store/index.ts';
import { styled } from 'styled-components';
import { StyledInLink } from '../../Atoms/InLink/InLink.styles.ts';
import { ArticleDataTypes } from '../../../types/dataTypes.ts';

const ActionIcon = styled(StyledInLink)`
  margin: 0 1rem;
  cursor: pointer;
`;

interface TableActionProps {
  id: number;
}

const TableActionIcons: FC<TableActionProps> = ({ id }) => {
  const { data: articles = [] } = useGetArticlesQuery();
  const dispatch = useDispatch();

  const article = (articles as ArticleDataTypes[]).find(
    (article) => article.id === id,
  );

  const handleDelete = (id: number) => {
    dispatch(clearSelected());
    dispatch(
      switchPopup({
        isOpen: true,
        ids: [id],
        title: article ? article.title : undefined,
      }),
    );
  };

  return (
    <>
      <InLink
        target={`/article/id=${id}`}
        name={
          <FontAwesomeIcon style={{ margin: '0 1rem' }} icon={['fas', 'pen']} />
        }
      />
      <ActionIcon
        as={FontAwesomeIcon}
        onClick={() => handleDelete(id)}
        icon={['fas', 'trash']}
      />
    </>
  );
};

export default TableActionIcons;
