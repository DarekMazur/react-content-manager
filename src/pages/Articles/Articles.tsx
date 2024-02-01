import Heading from '../../components/Atoms/Heading/Heading.tsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useGetArticlesQuery } from '../../store';
import MultiAction from '../../components/Molecules/MultiAction/MultiAction.tsx';
import { ArticleDataTypes, UserTypes } from '../../types/dataTypes.ts';
import TableWrapper from '../../components/Organisms/TableComponents/TableWrapper/TableWrapper.tsx';
// import { articlesTableHeaders } from '../../utils/data.ts';
import { Loading } from '../../components/Atoms/Loading/Loading.styles.ts';
import { Main } from '../../components/Organisms/Main/Main.styles.ts';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormButton } from '../../components/Organisms/Forms/UserForm/UserForm.styles.ts';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const Articles = () => {
  const { t } = useTranslation();
  const { data: articles = [], isLoading } = useGetArticlesQuery();
  const navigate = useNavigate();
  const height = useMinHeight();
  const currentUser = useSelector<RootState>((state) => state.user);

  const selectedArticles = useSelector<RootState>((state) => state.selected);

  const [availableArticles, setAvailableArticles] = useState<
    ArticleDataTypes[]
  >([]);

  const articlesTableHeaders = [
    '',
    t('article.tableHeaders.id'),
    t('article.tableHeaders.status'),
    t('article.tableHeaders.title'),
    t('article.tableHeaders.author'),
    t('article.tableHeaders.sticky'),
    t('article.tableHeaders.categories'),
    t('article.tableHeaders.comments'),
    t('article.tableHeaders.likes'),
    t('article.tableHeaders.publishedAt'),
    '',
  ];

  useEffect(() => {
    if ((currentUser as UserTypes).role.id === 3) {
      setAvailableArticles(
        articles.filter(
          (article) => article.author.uuid === (currentUser as UserTypes).uuid,
        ),
      );
    } else {
      setAvailableArticles(articles);
    }
  }, [articles, currentUser]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Main $minHeight={height}>
      <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
        {t('article.header')}
      </Heading>
      {(selectedArticles as ArticleDataTypes[]).length > 0 ? (
        <MultiAction
          counter={(selectedArticles as ArticleDataTypes[]).length}
        />
      ) : null}
      <div
        style={{
          width: '95vw',
          margin: '0 auto 0.8rem',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <FormButton
          $type="submit"
          type="button"
          onClick={() => navigate('/articles/create')}
        >
          <FontAwesomeIcon icon={['fas', 'pen']} /> {t('article.newArticle')}
        </FormButton>
      </div>
      <TableWrapper
        content={availableArticles}
        headers={articlesTableHeaders}
      />
    </Main>
  );
};

export default Articles;
