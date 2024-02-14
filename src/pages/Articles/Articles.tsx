import Heading from '../../components/Atoms/Heading/Heading.tsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearSort,
  ISortTypes,
  RootState,
  useGetArticlesQuery,
} from '../../store';
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
  const dispatch = useDispatch();
  const { data: articles = {}, isLoading } = useGetArticlesQuery();
  const sort = useSelector<RootState>((state) => state.sort);
  const filters = useSelector<RootState>((state) => state.filters);
  const navigate = useNavigate();
  const height = useMinHeight();
  const currentUser = useSelector<RootState>((state) => state.user);

  const selectedArticles = useSelector<RootState>((state) => state.selected);

  const [availableArticles, setAvailableArticles] = useState<
    IArticleDataTypes[]
  >([]);

  const [filteredArticles, setFilteredArticles] = useState<IArticleDataTypes[]>(
    articles?.data || [],
  );

  const [authorsList, setAuthorsList] = useState([]);

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

  useEffect(() => {
    articles.data
      ? setAuthorsList(
          articles.data.map((article) => ({
            label: article?.attributes.author.data.attributes.username,
            id: article?.attributes.author.data.id,
          })),
        )
      : null;
  }, [articles]);

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
    dispatch(clearSort());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const sortedArticles = [...filteredArticles];

    sortedArticles.sort((a, b) => {
      if ((sort as ISortTypes).sortBy === 'status') {
        const statusA = Number(a.attributes.publishedAt !== null);
        const statusB = Number(b.attributes.publishedAt !== null);
        return statusA - statusB;
      } else if ((sort as ISortTypes).sortBy === 'publishedAt') {
        const dateA = a.attributes.publishedAt
          ? new Date(a.attributes.publishedAt).getTime()
          : 0;
        const dateB = b.attributes.publishedAt
          ? new Date(b.attributes.publishedAt).getTime()
          : 0;
        return dateA - dateB;
      } else if ((sort as ISortTypes).sortBy === 'author') {
        if (
          a.attributes.author.data.attributes.username <
          b.attributes.author.data.attributes.username
        ) {
          return -1;
        }
        if (
          a.author.data.attributes.username > b.author.data.attributes.username
        ) {
          return 1;
        }

        return 0;
      } else if ((sort as ISortTypes).sortBy === 'comments') {
        const commentsA = a.attributes.comments
          ? a.attributes.comments.length
          : 0;
        const commentsB = b.attributes.comments
          ? b.attributes.comments.length
          : 0;
        return commentsA - commentsB;
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const sortingElementA =
          a.attributes[(sort as ISortTypes).sortBy as keyof IArticleDataTypes];
        const sortingElementB =
          b.attributes[(sort as ISortTypes).sortBy as keyof IArticleDataTypes];
        if (
          (sortingElementA ? sortingElementA : 0) <
          (sortingElementB ? sortingElementB : 0)
        ) {
          return -1;
        }
        if (
          (sortingElementA ? sortingElementA : 0) >
          (sortingElementB ? sortingElementB : 0)
        ) {
          return 1;
        }

        return 0;
      }
    });

    if ((sort as ISortTypes).order === 'asc') {
      setFilteredArticles(sortedArticles);
    } else {
      setFilteredArticles(sortedArticles.reverse());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, availableArticles]);

  useEffect(() => {
    if ((currentUser as IUserTypes).role.id === 3) {
      setAvailableArticles(
        articles.data.filter(
          (article) => article.author.uuid === (currentUser as IUserTypes).uuid,
        ),
      );
    } else {
      setAvailableArticles(articles.data);
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
      {filteredArticles ? (
        <TableWrapper
          content={filteredArticles}
          headers={articlesTableHeaders}
        />
      ) : null}
    </Main>
  );
};

export default Articles;
