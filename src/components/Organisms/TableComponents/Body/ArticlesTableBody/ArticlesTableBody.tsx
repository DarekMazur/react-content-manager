import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ArticleDataTypes } from '../../../../../types/dataTypes';
import {
  RootState,
  addSelected,
  removeSelected,
  useUpdateArticleMutation,
} from '../../../../../store';
import Checkbox from '../../../../Molecules/Checkbox/Checkbox';
import StatusInfo from '../../../../Atoms/StatusInfo/StatusInfo';
import { getDate } from '../../../../../utils/methods/getDate';
import TableActionIcons from '../../../../Molecules/TableActionIcons/TableActionIcons';
import { db } from '../../../../../mocks/db';

const ArticlesTableBody = ({ data }: { data: ArticleDataTypes[] }) => {
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
    if (
      checkedElement &&
      checkedArticles.includes(checkedElement as ArticleDataTypes)
    ) {
      dispatch(removeSelected(checkedElement));
      setCheckedArticles(
        checkedArticles.filter((article) => article.uuid !== uuid),
      );
    } else if (checkedElement) {
      dispatch(addSelected(checkedElement));
      setCheckedArticles((prevState) => [
        ...prevState,
        checkedElement as ArticleDataTypes,
      ]);
    }
  };

  const handleClickSticky = (uuid: string) => {
    const article = data.find((article) => article.uuid === uuid);
    updateArticle({
      ...article,
      isSticky: !(article as ArticleDataTypes)?.isSticky,
    });
  };
  return (
    <>
      {data.map((article) => (
        <tr key={article.uuid}>
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
              isChecked={Array.from(
                checkedArticles as ArticleDataTypes[],
              ).includes(article)}
            />
          </td>
          <td>{article.id}</td>
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
          <td>
            {article.categories.map((category, index, array) => (
              <span>
                {category.title}
                {index + 1 === array.length ? null : ', '}
              </span>
            ))}
          </td>
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
    </>
  );
};

export default ArticlesTableBody;
