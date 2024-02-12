import Heading from '../../components/Atoms/Heading/Heading.tsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useGetArticlesQuery } from '../../store';
import MultiAction from '../../components/Molecules/MultiAction/MultiAction.tsx';
import {
  ArticleDataTypes,
  IFilterElementsTypes,
  UserTypes,
} from '../../types/dataTypes.ts';
import TableWrapper from '../../components/Organisms/TableComponents/TableWrapper/TableWrapper.tsx';
// import { articlesTableHeaders } from '../../utils/data.ts';
import { Loading } from '../../components/Atoms/Loading/Loading.styles.ts';
import { Main } from '../../components/Organisms/Main/Main.styles.ts';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormButton } from '../../components/Organisms/Forms/UserForm/UserForm.styles.ts';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import FilterMenu from '../../components/Organisms/FilterMenu/FilterMenu.tsx';

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

  const authorsList = articles.map((article) => ({
    label: article.author.username,
    id: article.author.uuid,
  }));

  const articleFilters: IFilterElementsTypes[] = [
    {
      label: t('filters.articles.status'),
      type: 'publishedAt',
      elements: [
        {
          label: t('filters.articles.published'),
          id: 'published',
        },
        {
          label: t('filters.articles.draft'),
          id: 'draft',
        },
      ],
    },
    {
      label: t('filters.articles.pinned'),
      type: 'isSticky',
      elements: [
        {
          label: t('filters.articles.yes'),
          id: 'sticky',
        },
        {
          label: t('filters.articles.no'),
          id: 'normal',
        },
      ],
    },
    {
      label: t('filters.articles.author'),
      type: 'author',
      elements: authorsList.filter(
        (author, index) =>
          index ===
          authorsList.findIndex((element) => element.id === author.id),
      ),
    },
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
      <FilterMenu menuItems={articleFilters} />
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
