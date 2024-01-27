import { FC } from 'react';
import { StyledTable } from './Table.styles.ts';
import {
  ArticleDataTypes,
  CategoriesTypes,
  CommentTypes,
  UserTypes,
} from '../../../../types/dataTypes.ts';
import ArticlesTableBody from '../Body/ArticlesTableBody/ArticlesTableBody';
import UsersTableBody from '../Body/UsersTableBody/UsersTableBody.tsx';
import CommentsTableBody from '../Body/CommentsTableBody/CommentsTableBody.tsx';

interface TableProps {
  headers: Array<string>;
  data: Array<ArticleDataTypes | UserTypes | CommentTypes | CategoriesTypes>;
  tag: string;
}

const Table: FC<TableProps> = ({ headers, data, tag }) => {
  const getBody = (tag: string) => {
    switch (tag) {
      case 'articles':
        return <ArticlesTableBody data={data as ArticleDataTypes[]} />;
      case 'users':
        return <UsersTableBody data={data as UserTypes[]} />;
      case 'comments':
        return <CommentsTableBody data={data as CommentTypes[]} />;
      case 'categories':
        return <p>Categories</p>;
      default:
        return null;
    }
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{getBody(tag)}</tbody>
    </StyledTable>
  );
};

export default Table;
