import { FC } from 'react';
import { StyledTable } from './Table.styles.ts';
import { ArticleDataTypes, UserTypes } from '../../../types/dataTypes';
import ArticlesTableBody from '../ArticlesTableBody/ArticlesTableBody';
import UsersTableBody from '../UsersTableBody/UsersTableBody';

interface TableProps {
  headers: Array<string>;
  data: Array<ArticleDataTypes | UserTypes>;
  tag: string;
}

const Table: FC<TableProps> = ({ headers, data, tag }) => {
  const getBody = (tag: string) => {
    switch (tag) {
      case 'articles':
        return <ArticlesTableBody data={data as ArticleDataTypes[]} />;
      case 'users':
        return <UsersTableBody data={data as UserTypes[]} />;
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
