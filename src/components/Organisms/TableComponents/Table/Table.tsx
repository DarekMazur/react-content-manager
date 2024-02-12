import { FC } from 'react';
import { StyledTable } from './Table.styles.ts';
import {
  IArticleDataTypes,
  ICategoriesTypes,
  ICommentTypes,
  IUserTypes,
} from '../../../../types/dataTypes.ts';
import ArticlesTableBody from '../Body/ArticlesTableBody/ArticlesTableBody';
import UsersTableBody from '../Body/UsersTableBody/UsersTableBody.tsx';
import CommentsTableBody from '../Body/CommentsTableBody/CommentsTableBody.tsx';
import CategoriesTableBody from '../Body/CategoriesTableBody/CategoriesTableBody.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ITableProps {
  headers: Array<string>;
  data: Array<
    IArticleDataTypes | IUserTypes | ICommentTypes | ICategoriesTypes
  >;
  tag: string;
}

const TableSorting = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '1rem',
      }}
    >
      <FontAwesomeIcon
        icon={['fas', 'caret-up']}
        style={{ fontSize: '1rem', cursor: 'pointer' }}
      />
      <FontAwesomeIcon
        icon={['fas', 'caret-down']}
        style={{ fontSize: '1rem', cursor: 'pointer' }}
      />
    </div>
  );
};

const Table: FC<ITableProps> = ({ headers, data, tag }) => {
  const getBody = (tag: string) => {
    switch (tag) {
      case 'articles':
        return <ArticlesTableBody data={data as IArticleDataTypes[]} />;
      case 'users':
        return <UsersTableBody data={data as IUserTypes[]} />;
      case 'comments':
        return <CommentsTableBody data={data as ICommentTypes[]} />;
      case 'categories':
        return <CategoriesTableBody data={data as ICategoriesTypes[]} />;
      default:
        return null;
    }
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 1.5rem',
                }}
              >
                {header}
                {header ? <TableSorting /> : null}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{getBody(tag)}</tbody>
    </StyledTable>
  );
};

export default Table;
