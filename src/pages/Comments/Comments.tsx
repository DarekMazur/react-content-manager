import { useEffect, useState } from 'react';
import { RootState, useGetCommentsQuery } from '../../store';
import { useSelector } from 'react-redux';
import {
  CommentTypes,
  IFilterElementsTypes,
  IFilterTypes,
  UserTypes,
} from '../../types/dataTypes';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import Heading from '../../components/Atoms/Heading/Heading';
import TableWrapper from '../../components/Organisms/TableComponents/TableWrapper/TableWrapper';
import MultiAction from '../../components/Molecules/MultiAction/MultiAction';
import { Main } from '../../components/Organisms/Main/Main.styles';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';
import { useTranslation } from 'react-i18next';
import FilterMenu from '../../components/Organisms/FilterMenu/FilterMenu.tsx';

const CommentsView = () => {
  const { t } = useTranslation();
  const { data: comments = [], isLoading } = useGetCommentsQuery();
  const filters = useSelector<RootState>((state) => state.filters);
  const height = useMinHeight();
  const currentUser = useSelector<RootState>((state) => state.user);
  const selectedComments = useSelector<RootState>(
    (state) => state.selectedComments,
  );
  const [availableComments, setAvailableComments] = useState<CommentTypes[]>(
    [],
  );

  const [filteredComments, setFilteredComments] =
    useState<CommentTypes[]>(comments);

  const commentsTableHeaders = [
    '',
    t('comment.tableHeaders.id'),
    t('comment.tableHeaders.status'),
    t('comment.tableHeaders.author'),
    t('comment.tableHeaders.article'),
    t('comment.tableHeaders.comment'),
    t('comment.tableHeaders.publishedAt'),
    '',
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
    if (
      (filters as IFilterTypes[]).filter((filter) => filter.value.length > 0)
        .length > 0
    ) {
      const filteredStatus = (filters as IFilterTypes[]).filter(
        (filter) => filter.type === 'shadowed',
      );

      let filtered: CommentTypes[] = [];

      if (filteredStatus[0] && filteredStatus[0].value.length > 0) {
        filtered = comments.filter((comment) =>
          filteredStatus[0].value.includes('visible')
            ? filteredStatus[0].value.includes('hidden')
              ? comment
              : !comment.shadowed
            : comment.shadowed,
        );
      }
      setFilteredComments(filtered);
    } else {
      setFilteredComments(comments);
    }
  }, [filters, comments]);

  useEffect(() => {
    if ((currentUser as UserTypes).role.id === 3) {
      setAvailableComments(
        filteredComments.filter(
          (comment) =>
            comment.article.author.uuid === (currentUser as UserTypes).uuid,
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
      <FilterMenu menuItems={commentsFilters} />
      <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
        {t('comment.header')}
      </Heading>
      {(selectedComments as CommentTypes[]).length > 0 ? (
        <MultiAction counter={(selectedComments as CommentTypes[]).length} />
      ) : null}
      <TableWrapper
        content={availableComments}
        headers={commentsTableHeaders}
      />
    </Main>
  );
};

export default CommentsView;
