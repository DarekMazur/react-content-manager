import { useParams } from 'react-router';
import { RootState, useGetCommentsQuery, useGetUsersQuery } from '../../store';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import { useEffect, useState } from 'react';
import { ICommentTypes, IUserTypes } from '../../types/dataTypes';
import { useSelector } from 'react-redux';
import { Main } from '../../components/Organisms/Main/Main.styles';
import CommentForm from '../../components/Organisms/Forms/CommentForm/CommentForm';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';
import Unauthorised from '../../components/Templates/Unauthorised/Unauthorised.tsx';

const CommentView = () => {
  const { uuid } = useParams();
  const height = useMinHeight();
  const { data: comments = [], isLoading } = useGetCommentsQuery();
  const { data: users = [] } = useGetUsersQuery();
  const currentUser = useSelector<RootState>((state) => state.user);

  const [userData, setUserData] = useState<IUserTypes | undefined>(undefined);
  const [currentComment, setCurrentComment] = useState<
    ICommentTypes | undefined
  >(undefined);

  useEffect(() => {
    if (currentComment && users.length > 0) {
      setUserData(
        users.find((user) => user.uuid === currentComment.author.uuid),
      );
    }
  }, [currentComment, users]);

  useEffect(() => {
    if (comments.length > 0) {
      setCurrentComment(comments.find((comment) => comment.uuid === uuid));
    }
  }, [comments, uuid]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Main $minHeight={height}>
      {currentComment && userData ? (
        (currentUser as IUserTypes).uuid ===
          currentComment.article.author.uuid ||
        (currentUser as IUserTypes).role.type === 'admin' ||
        (currentUser as IUserTypes).role.type === 'redactor' ? (
          <CommentForm />
        ) : (
          <Unauthorised />
        )
      ) : null}
    </Main>
  );
};

export default CommentView;
