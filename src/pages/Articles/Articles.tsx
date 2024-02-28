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
  IFilterElementsTypes,
  IFilterTypes,
  ITableHeaders,
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
import { IArticleData, IArticlesDataTypes } from '../../types/articleTypes.ts';
import { IStrapiUser } from '../../types/userTypes.ts';

interface IAuthorsList {
  label: string;
  id: number;
}

const Articles = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: articles, isLoading } = useGetArticlesQuery();
  const sort = useSelector<RootState>((state) => state.sort);
  const filters = useSelector<RootState>((state) => state.filters);
  const navigate = useNavigate();
  const height = useMinHeight();
  const currentUser = useSelector<RootState>((state) => state.user);

  const selectedArticles = useSelector<RootState>((state) => state.selected);

  const [availableArticles, setAvailableArticles] = useState<IArticleData[]>(
    [],
  );

  const [filteredArticles, setFilteredArticles] = useState<IArticleData[]>([]);

  const [authorsList, setAuthorsList] = useState<IAuthorsList[]>([]);

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
    articles && (articles as IArticlesDataTypes).data
      ? setAuthorsList(
          (articles as IArticlesDataTypes).data.map((article) => ({
            label: article.attributes.author.data
              ? article.attributes.author.data.attributes.username
              : t('article.form.noAuthor'),
            id: article.attributes.author.data
              ? article.attributes.author.data.id
              : 0,
          })),
        )
      : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const authorA = a.attributes.author.data
          ? a.attributes.author.data.attributes.username
          : t('article.form.noAuthor');
        const authorB = b.attributes.author.data
          ? b.attributes.author.data.attributes.username
          : t('article.form.noAuthor');

        if (authorA < authorB) {
          return -1;
        }
        if (authorA > authorB) {
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
      } else if ((sort as ISortTypes).sortBy === 'id') {
        return a.id - b.id;
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const sortingElementA = a.attributes[(sort as ISortTypes).sortBy];

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const sortingElementB = b.attributes[(sort as ISortTypes).sortBy];

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

      let filtered: IArticleData[] = [];

      if (filteredAuthor[0] && filteredAuthor[0].value.length > 0) {
        filtered.push(
          ...availableArticles.filter((article) =>
            filteredAuthor[0].value.includes(
              article.attributes.author.data
                ? String(article.attributes.author.data.id)
                : '0',
            ),
          ),
        );
      } else {
        articles && filtered.push(...articles.data);
      }

      if (filteredStatus[0] && filteredStatus[0].value.length > 0) {
        filtered = filtered.filter((article) =>
          filteredStatus[0].value.includes('draft')
            ? filteredStatus[0].value.includes('published')
              ? article
              : article.attributes.publishedAt === null
            : article.attributes.publishedAt !== null,
        );
      }

      if (filteredPinned[0] && filteredPinned[0].value.length > 0) {
        filtered = filtered.filter((article) =>
          filteredPinned[0].value.includes('sticky')
            ? filteredPinned[0].value.includes('normal')
              ? article
              : article.attributes.isSticky
            : !article.attributes.isSticky,
        );
      }

      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(availableArticles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, availableArticles]);

  useEffect(() => {
    if ((currentUser as IStrapiUser).role.id === 3) {
      articles &&
        setAvailableArticles(
          (articles as IArticlesDataTypes).data.filter(
            (article) =>
              article.attributes.author.data.attributes.uuid ===
              (currentUser as IStrapiUser).uuid,
          ),
        );
    } else {
      setAvailableArticles(articles?.data || []);
    }
  }, [articles, currentUser]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Main $minHeight={height}>
      {filteredArticles.length > 0 ? (
        <FilterMenu menuItems={articleFilters} />
      ) : null}
      <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
        {t('article.header')}
      </Heading>
      {(selectedArticles as IArticleData[]).length > 0 ? (
        <MultiAction counter={(selectedArticles as IArticleData[]).length} />
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
        {filteredArticles.length > 0 ? (
          <FormButton
            $type="submit"
            type="button"
            onClick={() => navigate('/articles/create')}
          >
            <FontAwesomeIcon icon={['fas', 'pen']} /> {t('article.newArticle')}
          </FormButton>
        ) : null}
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
