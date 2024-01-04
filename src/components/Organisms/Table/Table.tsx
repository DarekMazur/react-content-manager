import { FC, useState } from 'react';
import { StyledTable } from './Table.styles.ts';
import Checkbox from '../../Molecules/Checkbox/Checkbox.tsx';
import StatusInfo from '../../Atoms/StatusInfo/StatusInfo.tsx';
import {
  addSelected,
  removeSelected,
  updateArticle,
} from '../../../store/index.ts';
import { useDispatch } from 'react-redux';
import TableActionIcons from '../../Molecules/TableActionIcons/TableActionIcons.tsx';
import { RoleTypes, db } from '../../../mocks/db.ts';
import { CommentTypes } from '../../../__mock__/mockComments.ts';
import { getDate } from '../../../utils/methods/getDate.ts';

export type TablePostDataTypes = {
  id: number;
  title: string;
  isSticky: boolean;
  description: string;
  body: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  likes: number;
  categories: string;
  author: {
    uuid: string;
    username: string;
    email: string;
    avatar: string;
    role: RoleTypes;
  };
  comments: Array<CommentTypes> | null;
};

interface TableProps {
  headers: Array<string>;
  data: Array<TablePostDataTypes>;
}

const Table: FC<TableProps> = ({ headers, data }) => {
  const dispatch = useDispatch();

  const [checkedArticles, setCheckedArticles] = useState<TablePostDataTypes[]>(
    [],
  );

  const handleClickSelect = (uuid: string) => {
    const checkedElement = data.find((article) => article.uuid === uuid);
    if (checkedElement && checkedArticles.includes(checkedElement)) {
      dispatch(removeSelected(checkedElement));
      setCheckedArticles(
        checkedArticles.filter((article) => article.uuid !== uuid),
      );
    } else if (checkedElement) {
      dispatch(addSelected(checkedElement));
      setCheckedArticles((prevState) => [...prevState, checkedElement]);
    }
  };

  const handleClickSticky = (uuid: string) => {
    const article = data.find((article) => article.uuid === uuid);
    const updateSticky = {
      ...article,
      sticky: !article?.isSticky,
    };
    dispatch(updateArticle([updateSticky]));
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
      <tbody>
        {data.map((article, index) => (
          <tr key={index + 1}>
            <td
              style={{
                height: '6rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
              }}
            >
              <Checkbox
                handleClick={handleClickSelect}
                uuid={article.uuid}
                isChecked={checkedArticles.includes(article)}
              />
            </td>
            <td>{index + 1}</td>
            <td
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 1rem',
              }}
            >
              <StatusInfo status={article.publishedAt ? true : false} />
            </td>
            <td style={{ textAlign: 'left' }}>{article.title}</td>
            <td style={{ textAlign: 'left' }}>{article.author.username}</td>
            <td>
              <Checkbox
                isChecked={article.isSticky}
                handleClick={handleClickSticky}
                uuid={article.uuid}
              />
            </td>
            <td>{article.categories}</td>
            <td>{db.comment.count({
              where: {
                article: {
                  uuid: {
                    equals: article.uuid
                  }
                }
              }
            })}</td>
            <td>{article.likes}</td>
            <td>{article.publishedAt ? getDate(article.publishedAt) : '-'}</td>
            <td style={{ textAlign: 'left' }}>
              <TableActionIcons postId={index + 1} uuid={article.uuid} />
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
