import { FC } from 'react';
import { StyledTable } from './Table.styles.ts';
import {
  ArticleDataTypes,
  CommentTypes,
  UserTypes,
} from '../../../types/dataTypes';
import ArticlesTableBody from '../ArticlesTableBody/ArticlesTableBody';
import UsersTableBody from '../UsersTableBody/UsersTableBody';
import CommentsTableBody from '../CommentsTableBody/CommentsTableBody';

interface TableProps {
  headers: Array<string>;
  data: Array<ArticleDataTypes | UserTypes | CommentTypes>;
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
