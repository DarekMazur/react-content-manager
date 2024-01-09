import { FC, useEffect, useState } from 'react';
import { StyledTable } from './Table.styles.ts';
import Checkbox from '../../Molecules/Checkbox/Checkbox.tsx';
import StatusInfo from '../../Atoms/StatusInfo/StatusInfo.tsx';
import {
  RootState,
  addSelected,
  removeSelected,
  useUpdateArticleMutation,
} from '../../../store/index.ts';
import { useDispatch, useSelector } from 'react-redux';
import { ArticleDataTypes } from '../../../types/dataTypes';
import TableActionIcons from '../../Molecules/TableActionIcons/TableActionIcons.tsx';
import { db } from '../../../mocks/db.ts';
import { getDate } from '../../../utils/methods/getDate.ts';

interface TableProps {
  headers: Array<string>;
  data: Array<ArticleDataTypes>;
}

const Table: FC<TableProps> = ({ headers, data }) => {
  const dispatch = useDispatch();

  const selectedArticles = useSelector<RootState>((state) => state.selected);
  const [updateArticle] = useUpdateArticleMutation();

  const [checkedArticles, setCheckedArticles] = useState<ArticleDataTypes[]>(
    selectedArticles as ArticleDataTypes[],
  );

  useEffect(() => {
    setCheckedArticles(selectedArticles as ArticleDataTypes[]);
  }, [selectedArticles]);

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
    updateArticle({ ...article, isSticky: !article?.isSticky });
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
            <td>
              {db.comment.count({
                where: {
                  article: {
                    uuid: {
                      equals: article.uuid,
                    },
                  },
                },
              })}
            </td>
            <td>{article.likes}</td>
            <td>{article.publishedAt ? getDate(article.publishedAt) : '-'}</td>
            <td style={{ textAlign: 'left' }}>
              <TableActionIcons id={article.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
