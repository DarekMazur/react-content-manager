import { useEffect, useState } from 'react';
import {
  clearSort,
  ISortTypes,
  RootState,
  useGetCommentsQuery,
} from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  IFilterElementsTypes,
  IFilterTypes,
  ITableHeaders,
} from '../../types/dataTypes';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import Heading from '../../components/Atoms/Heading/Heading';
import TableWrapper from '../../components/Organisms/TableComponents/TableWrapper/TableWrapper';
import MultiAction from '../../components/Molecules/MultiAction/MultiAction';
import { Main } from '../../components/Organisms/Main/Main.styles';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';
import { useTranslation } from 'react-i18next';
import FilterMenu from '../../components/Organisms/FilterMenu/FilterMenu.tsx';
import { ICommentData } from '../../types/commentTypes.ts';
import { IStrapiUser } from '../../types/userTypes.ts';

const CommentsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: comments, isLoading } = useGetCommentsQuery();
  const sort = useSelector<RootState>((state) => state.sort);
  const filters = useSelector<RootState>((state) => state.filters);
  const height = useMinHeight();
  const currentUser = useSelector<RootState>((state) => state.user);
  const selectedComments = useSelector<RootState>(
    (state) => state.selectedComments,
  );
  const [availableComments, setAvailableComments] = useState<ICommentData[]>(
    [],
  );

  const [filteredComments, setFilteredComments] = useState<ICommentData[]>([]);

  const commentsTableHeaders: ITableHeaders[] = [
    {
      value: '',
      sortingKey: null,
    },
    {
      value: t('comment.tableHeaders.id'),
      sortingKey: 'id',
    },
    {
      value: t('comment.tableHeaders.status'),
      sortingKey: 'shadowed',
    },
    {
      value: t('comment.tableHeaders.author'),
      sortingKey: 'author',
    },
    {
      value: t('comment.tableHeaders.article'),
      sortingKey: 'article',
    },
    {
      value: t('comment.tableHeaders.comment'),
      sortingKey: 'content',
    },
    {
      value: t('comment.tableHeaders.publishedAt'),
      sortingKey: 'publishedAt',
    },
    {
      value: '',
      sortingKey: null,
    },
  ];

  const commentsFilters: IFilterElementsTypes[] = [
    {
      label: t('filters.comments.status'),
      type: 'shadowed',
      elements: [
        {
          label: t('filters.comments.visible'),
          id: 'visible',
        },
        {
          label: t('filters.comments.hidden'),
          id: 'hidden',
        },
      ],
    },
  ];

  useEffect(() => {
    dispatch(clearSort());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (comments) {
      const sortedComments = [...comments.data];

      sortedComments.sort((a, b) => {
        if ((sort as ISortTypes).sortBy === 'author') {
          if (
            a.attributes.author.data.attributes.username <
            b.attributes.author.data.attributes.username
          ) {
            return -1;
          }
          if (
            a.attributes.author.data.attributes.username >
            b.attributes.author.data.attributes.username
          ) {
            return 1;
          }

          return 0;
        } else if ((sort as ISortTypes).sortBy === 'article') {
          if (
            a.attributes.article.data.attributes.title <
            b.attributes.article.data.attributes.title
          ) {
            return -1;
          }
          if (
            a.attributes.article.data.attributes.title >
            b.attributes.article.data.attributes.title
          ) {
            return 1;
          }

          return 0;
        } else if ((sort as ISortTypes).sortBy === 'publishedAt') {
          return (
            new Date(a.attributes.createdAt).getTime() -
            new Date(b.attributes.createdAt).getTime()
          );
        } else {
          if (
            a[(sort as ISortTypes).sortBy as keyof ICommentData] <
            b[(sort as ISortTypes).sortBy as keyof ICommentData]
          ) {
            return -1;
          }
          if (
            a[(sort as ISortTypes).sortBy as keyof ICommentData] >
            b[(sort as ISortTypes).sortBy as keyof ICommentData]
          ) {
            return 1;
          }

          return 0;
        }
      });

      if ((sort as ISortTypes).order === 'asc') {
        setFilteredComments(sortedComments);
      } else {
        setFilteredComments(sortedComments.reverse());
      }

      setFilteredComments(sortedComments);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  useEffect(() => {
    if (comments) {
      if (
        (filters as IFilterTypes[]).filter((filter) => filter.value.length > 0)
          .length > 0
      ) {
        const filteredStatus = (filters as IFilterTypes[]).filter(
          (filter) => filter.type === 'shadowed',
        );

        let filtered: ICommentData[] = [];

        if (filteredStatus[0] && filteredStatus[0].value.length > 0) {
          filtered = comments.data.filter((comment) =>
            filteredStatus[0].value.includes('visible')
              ? filteredStatus[0].value.includes('hidden')
                ? comment
                : !comment.attributes.shadowed
              : comment.attributes.shadowed,
          );
        }
        setFilteredComments(filtered);
      } else {
        setFilteredComments(comments.data);
      }
    }
  }, [filters, comments]);

  useEffect(() => {
    if ((currentUser as IStrapiUser).role.id === 3) {
      setAvailableComments(
        filteredComments.filter(
          (comment) =>
            comment.attributes.article.data.attributes.author.data.attributes
              .uuid === (currentUser as IStrapiUser).uuid,
        ),
      );
    } else {
      setAvailableComments(filteredComments);
    }
  }, [filteredComments, currentUser]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Main $minHeight={height}>
      {availableComments.length > 0 ? (
        <FilterMenu menuItems={commentsFilters} />
      ) : null}
      <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
        {t('comment.header')}
      </Heading>
      {(selectedComments as ICommentData[]).length > 0 ? (
        <MultiAction counter={(selectedComments as ICommentData[]).length} />
      ) : null}
      <TableWrapper
        content={availableComments}
        headers={commentsTableHeaders}
      />
    </Main>
  );
};

export default CommentsView;
