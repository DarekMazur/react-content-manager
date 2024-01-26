import { useEffect, useState } from 'react';
import { getFooterHeight } from '../../utils/methods/getFooterHeight';
import { RootState, useGetCommentsQuery } from '../../store';
import { useSelector } from 'react-redux';
import { CommentTypes, UserTypes } from '../../types/dataTypes';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import Heading from '../../components/Atoms/Heading/Heading';
import TableWrapper from '../../components/Organisms/TableComponents/TableWrapper/TableWrapper';
import { commentsTableHeaders } from '../../utils/data';
import MultiAction from '../../components/Molecules/MultiAction/MultiAction';
import { Main } from '../../components/Organisms/Main/Main.styles';

const CommentsView = () => {
  const { data: comments = [], isLoading } = useGetCommentsQuery();
  const currentUser = useSelector<RootState>((state) => state.user);
  const selectedComments = useSelector<RootState>(
    (state) => state.selectedComments,
  );

  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [availableComments, setAvailableComments] = useState<CommentTypes[]>(
    [],
  );

  useEffect(() => {
    if ((currentUser as UserTypes).role.id === 3) {
      setAvailableComments(
        comments.filter(
          (comment) =>
            comment.article.author.uuid === (currentUser as UserTypes).uuid,
        ),
      );
    } else {
      setAvailableComments(comments);
    }
  }, [comments, currentUser]);

  useEffect(() => {
    setWrapperHeight(getFooterHeight() + 50);
  }, []);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Main $minHeight={window.innerHeight - wrapperHeight}>
      <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
        Comments
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
