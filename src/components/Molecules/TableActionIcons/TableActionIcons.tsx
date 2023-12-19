import { FC } from 'react';
import InLink from '../../Atoms/InLink/InLink.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, removeArticle } from '../../../store/index.ts';
import { styled } from 'styled-components';
import { StyledInLink } from '../../Atoms/InLink/InLink.styles.ts';
import { TablePostDataTypes } from '../../Organisms/Table/Table.tsx';

const ActionIcon = styled(StyledInLink)`
  margin: 0 1rem;
  cursor: pointer;
`;

interface TableActionProps {
  postId: number;
  id: string;
}

const TableActionIcons: FC<TableActionProps> = ({ postId, id }) => {
  const articles = useSelector<RootState>((state) => state.articles);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    const temp = (articles as TablePostDataTypes[]).find(
      (article) => article.id === id,
    );
    dispatch(removeArticle(temp));
  };
  return (
    <>
      <InLink
        target={`/article/id=${postId}`}
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
