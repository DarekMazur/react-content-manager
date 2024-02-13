import Heading from '../../components/Atoms/Heading/Heading.tsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useGetArticlesQuery } from '../../store';
import MultiAction from '../../components/Molecules/MultiAction/MultiAction.tsx';
import {
  IArticleDataTypes,
  IFilterElementsTypes,
  IFilterTypes,
  ITableHeaders,
  IUserTypes,
} from '../../types/dataTypes.ts';
import TableWrapper from '../../components/Organisms/TableComponents/TableWrapper/TableWrapper.tsx';
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
  const filters = useSelector<RootState>((state) => state.filters);
  const navigate = useNavigate();
  const height = useMinHeight();
  const currentUser = useSelector<RootState>((state) => state.user);

  const selectedArticles = useSelector<RootState>((state) => state.selected);

  const [availableArticles, setAvailableArticles] = useState<
    IArticleDataTypes[]
  >([]);

  const [filteredArticles, setFilteredArticles] =
    useState<IArticleDataTypes[]>(articles);

  const articlesTableHeaders: ITableHeaders[] = [
    {
      value: '',
      sortingKey: null,
    },
    {
      value: t('article.tableHeaders.id'),
      sortingKey: 'id',
    },
    {
      value: t('article.tableHeaders.status'),
      sortingKey: 'status',
    },
    {
      value: t('article.tableHeaders.title'),
      sortingKey: 'title',
    },
    {
      value: t('article.tableHeaders.author'),
      sortingKey: 'author',
    },
    {
      value: t('article.tableHeaders.sticky'),
      sortingKey: 'isSticky',
    },
    {
      value: t('article.tableHeaders.categories'),
      sortingKey: 'categories',
    },

    {
      value: t('article.tableHeaders.comments'),
      sortingKey: 'comments',
    },
    {
      value: t('article.tableHeaders.likes'),
      sortingKey: 'likes',
    },
    {
      value: t('article.tableHeaders.publishedAt'),
      sortingKey: 'publishedAt',
    },
    {
      value: '',
      sortingKey: null,
    },
  ];

  const authorsList = articles.map((article) => ({
    label: article.author.username,
    id: article.author.id,
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
    if (
      (filters as IFilterTypes[]).filter((filter) => filter.value.length > 0)
        .length > 0
    ) {
      const filteredStatus = (filters as IFilterTypes[]).filter(
        (filter) => filter.type === 'publishedAt',
      );
      const filteredPinned = (filters as IFilterTypes[]).filter(
        (filter) => filter.type === 'isSticky',
      );
      const filteredAuthor = (filters as IFilterTypes[]).filter(
        (filter) => filter.type === 'author',
      );

      let filtered: IArticleDataTypes[] = [];

      if (filteredAuthor[0] && filteredAuthor[0].value.length > 0) {
        filtered.push(
          ...availableArticles.filter((article) =>
            filteredAuthor[0].value.includes(String(article.author.id)),
          ),
        );
      } else {
        filtered.push(...articles);
      }

      if (filteredStatus[0] && filteredStatus[0].value.length > 0) {
        filtered = filtered.filter((article) =>
          filteredStatus[0].value.includes('draft')
            ? filteredStatus[0].value.includes('published')
              ? article
              : article.publishedAt === null
            : article.publishedAt !== null,
        );
      }

      if (filteredPinned[0] && filteredPinned[0].value.length > 0) {
        filtered = filtered.filter((article) =>
          filteredPinned[0].value.includes('sticky')
            ? filteredPinned[0].value.includes('normal')
              ? article
              : article.isSticky
            : !article.isSticky,
        );
      }

      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(availableArticles);
    }
  }, [filters, availableArticles]);

  useEffect(() => {
    if ((currentUser as IUserTypes).role.id === 3) {
      setAvailableArticles(
        articles.filter(
          (article) => article.author.uuid === (currentUser as IUserTypes).uuid,
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
      {(selectedArticles as IArticleDataTypes[]).length > 0 ? (
        <MultiAction
          counter={(selectedArticles as IArticleDataTypes[]).length}
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
      <TableWrapper content={filteredArticles} headers={articlesTableHeaders} />
    </Main>
  );
};

export default Articles;
