import { FC } from 'react';
import { StyledTable } from './Table.styles.ts';
import { ITableHeaders } from '../../../../types/dataTypes.ts';
import ArticlesTableBody from '../Body/ArticlesTableBody/ArticlesTableBody';
import UsersTableBody from '../Body/UsersTableBody/UsersTableBody.tsx';
import CommentsTableBody from '../Body/CommentsTableBody/CommentsTableBody.tsx';
import CategoriesTableBody from '../Body/CategoriesTableBody/CategoriesTableBody.tsx';
import TableSorting from '../../../Molecules/TableSorting/TableSorting.tsx';
import { IArticleData } from '../../../../types/articleTypes.ts';
import { IStrapiUser } from '../../../../types/userTypes.ts';
import { ICommentData } from '../../../../types/commentTypes.ts';
import { ICategoryData } from '../../../../types/categoryTypes.ts';

interface ITableProps {
  headers: ITableHeaders[];
  data: IArticleData[] | IStrapiUser[] | ICommentData[] | ICategoryData[];
  tag: string;
}

const Table: FC<ITableProps> = ({ headers, data, tag }) => {
  const getBody = (tag: string) => {
    switch (tag) {
      case 'articles':
        return <ArticlesTableBody data={data as IArticleData[]} />;
      case 'users':
        return <UsersTableBody data={data as IStrapiUser[]} />;
      case 'comments':
        return <CommentsTableBody data={data as ICommentData[]} />;
      case 'categories':
        return <CategoriesTableBody data={data as ICategoryData[]} />;
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
              <div>
                {header.value}
                {header.value && header.value !== 'Categories' ? (
                  <TableSorting sortValue={header.sortingKey} />
                ) : null}
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
