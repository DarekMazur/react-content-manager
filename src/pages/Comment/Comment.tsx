import { useParams } from 'react-router';
import { RootState, useGetCommentQuery } from '../../store';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Main } from '../../components/Organisms/Main/Main.styles';
import CommentForm from '../../components/Organisms/Forms/CommentForm/CommentForm';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';
import Unauthorised from '../../components/Templates/Unauthorised/Unauthorised.tsx';
import { IStrapiUser } from '../../types/userTypes.ts';
import { ICommentPopulated } from '../../types/commentTypes.ts';

const CommentView = () => {
  const { id } = useParams();
  const height = useMinHeight();
  const { data: singleComment, isLoading } = useGetCommentQuery(id as string);
  const currentUser = useSelector<RootState>((state) => state.user);

  const [currentComment, setCurrentComment] = useState<
    ICommentPopulated | undefined
  >(undefined);

  useEffect(() => {
    if (singleComment) {
      setCurrentComment(singleComment.data);
    }
  }, [singleComment]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Main $minHeight={height}>
      {currentComment ? (
        (currentUser as IStrapiUser).id ===
          currentComment.attributes.author.data?.id ||
        (currentUser as IStrapiUser).role.type !== 'authenticated' ||
        (currentUser as IStrapiUser).role.type === 'public' ? (
          <CommentForm currentComment={currentComment} />
        ) : (
          <Unauthorised />
        )
      ) : null}
    </Main>
  );
};

export default CommentView;
