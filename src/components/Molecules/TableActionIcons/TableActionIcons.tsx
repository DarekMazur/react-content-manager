import { FC } from 'react';
import InLink from '../../Atoms/InLink/InLink.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TableActionProps {
  postId: number;
}

const TableActionIcons: FC<TableActionProps> = ({ postId }) => {
  return (
    <>
      <InLink
        target={`/article/id=${postId}`}
        name={
          <FontAwesomeIcon style={{ margin: '0 1rem' }} icon={['fas', 'pen']} />
        }
      />
      <InLink
        target={`/article/id=${postId}?del`}
        name={
          <FontAwesomeIcon
            style={{ margin: '0 1rem' }}
            icon={['fas', 'trash']}
          />
        }
      />
    </>
  );
};

export default TableActionIcons;
