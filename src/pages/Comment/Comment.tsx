import { useParams } from 'react-router';
import { RootState, useGetCommentsQuery } from '../../store';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Main } from '../../components/Organisms/Main/Main.styles';
import CommentForm from '../../components/Organisms/Forms/CommentForm/CommentForm';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';
import Unauthorised from '../../components/Templates/Unauthorised/Unauthorised.tsx';
import { IStrapiUser } from '../../types/userTypes.ts';
import { ICommentData } from '../../types/commentTypes.ts';

const CommentView = () => {
  const { uuid } = useParams();
  const height = useMinHeight();
  const { data: comments, isLoading } = useGetCommentsQuery();
  const currentUser = useSelector<RootState>((state) => state.user);

  const [currentComment, setCurrentComment] = useState<
    ICommentData | undefined
  >(undefined);

  useEffect(() => {
    if (comments && comments.data.length > 0) {
      setCurrentComment(
        comments.data.find((comment) => comment.attributes.uuid === uuid),
      );
    }
  }, [comments, uuid]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Main $minHeight={height}>
      {currentComment ? (
        (currentUser as IStrapiUser).id ===
          currentComment.attributes.author.data.id ||
        (currentUser as IStrapiUser).role.type !== 'authenticated' ||
        (currentUser as IStrapiUser).role.type === 'public' ? (
          <CommentForm />
        ) : (
          <Unauthorised />
        )
      ) : (
        'null'
      )}
    </Main>
  );
};

export default CommentView;
