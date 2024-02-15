import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IStrapiArticleData } from '../../../../../types/dataTypes';
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

const ArticlesTableBody = ({ data }: { data: IStrapiArticleData[] }) => {
  const dispatch = useDispatch();

  const selectedArticles = useSelector<RootState>((state) => state.selected);
  const [updateArticle] = useUpdateArticleMutation();

  const [checkedArticles, setCheckedArticles] = useState<IStrapiArticleData[]>(
    selectedArticles as IStrapiArticleData[],
  );

  useEffect(() => {
    console.log(data);
  }, []);

  useEffect(() => {
    setCheckedArticles(selectedArticles as IStrapiArticleData[]);
  }, [selectedArticles]);

  const handleClickSelect = (uuid: string) => {
    const checkedElement = data.find(
      (article) => article.attributes.uuid === uuid,
    );
    if (
      checkedElement &&
      checkedArticles.includes(checkedElement as IStrapiArticleData)
    ) {
      dispatch(removeSelected(checkedElement));
      setCheckedArticles(
        checkedArticles.filter((article) => article.attributes.uuid !== uuid),
      );
    } else if (checkedElement) {
      dispatch(addSelected(checkedElement));
      setCheckedArticles((prevState) => [
        ...prevState,
        checkedElement as IStrapiArticleData,
      ]);
    }
  };

  const handleClickSticky = (uuid: string) => {
    const article = data.find((article) => article.attributes.uuid === uuid);
    updateArticle({
      ...article,
      isSticky: !(article as IStrapiArticleData).attributes.isSticky,
    });
  };
  return (
    <>
      {data.map((article) => (
        <tr key={article.attributes.uuid}>
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
              uuid={article.attributes.uuid}
              isChecked={Array.from(
                checkedArticles as IStrapiArticleData[],
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
            <StatusInfo status={!!article.attributes.publishedAt} />
          </td>
          <td style={{ textAlign: 'left' }}>{article.attributes.title}</td>
          <td style={{ textAlign: 'left' }}>
            {article.attributes.author.data.attributes.username}
          </td>
          <td>
            <Checkbox
              isChecked={article.attributes.isSticky}
              handleClick={handleClickSticky}
              uuid={article.attributes.uuid}
            />
          </td>
          <td>
            {article.attributes.categories.data.map(
              (category, index, array) => (
                <span key={index}>
                  {category.attributes.title}
                  {index + 1 === array.length ? null : ', '}
                </span>
              ),
            )}
          </td>
          <td>
            {db.comment.count({
              where: {
                article: {
                  uuid: {
                    equals: article.attributes.uuid,
                  },
                },
              },
            })}
          </td>
          <td>{article.attributes.likes}</td>
          <td>
            {article.attributes.publishedAt
              ? getDate(article.attributes.publishedAt)
              : '-'}
          </td>
          <td style={{ textAlign: 'left' }}>
            <TableActionIcons id={article.id} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default ArticlesTableBody;
