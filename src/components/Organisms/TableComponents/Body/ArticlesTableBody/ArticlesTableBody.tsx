import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
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
import { IArticleData } from '../../../../../types/articleTypes.ts';
import { useTranslation } from 'react-i18next';
import { Italic } from '../../../../Atoms/Italic/Italic.styles.ts';

const ArticlesTableBody = ({ data }: { data: IArticleData[] }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const selectedArticles = useSelector<RootState>((state) => state.selected);
  const [updateArticle] = useUpdateArticleMutation();

  const [checkedArticles, setCheckedArticles] = useState<IArticleData[]>(
    selectedArticles as IArticleData[],
  );

  useEffect(() => {
    setCheckedArticles(selectedArticles as IArticleData[]);
  }, [selectedArticles]);

  const handleClickSelect = (uuid: string) => {
    const checkedElement = data.find(
      (article) => article.attributes.uuid === uuid,
    );
    if (
      checkedElement &&
      checkedArticles.includes(checkedElement as IArticleData)
    ) {
      dispatch(removeSelected(checkedElement));
      setCheckedArticles(
        checkedArticles.filter((article) => article.attributes.uuid !== uuid),
      );
    } else if (checkedElement) {
      dispatch(addSelected(checkedElement));
      setCheckedArticles((prevState) => [
        ...prevState,
        checkedElement as IArticleData,
      ]);
    }
  };

  const handleClickSticky = (uuid: string) => {
    const article = data.find((article) => article.attributes.uuid === uuid);
    updateArticle({
      data: {
        ...article,
        isSticky: !(article as IArticleData).attributes.isSticky,
      },
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
              isChecked={Array.from(checkedArticles as IArticleData[]).includes(
                article,
              )}
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
            {article.attributes.author.data ? (
              article.attributes.author.data.attributes.username
            ) : (
              <Italic>{t('article.form.noAuthor')}</Italic>
            )}
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
          <td>{article.attributes.categories.data.length}</td>
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
