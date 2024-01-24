import { useParams } from 'react-router';
import { RootState, useGetCommentsQuery, useGetUsersQuery } from '../../store';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import { useEffect, useState } from 'react';
import { CommentTypes, UserTypes } from '../../types/dataTypes';
import { useSelector } from 'react-redux';
import { getFooterHeight } from '../../utils/methods/getFooterHeight';
import { Main } from '../../components/Organisms/Main/Main.styles';
import CommentForm from '../../components/Organisms/CommentForm/CommentForm';

const CommentView = () => {
  const { uuid } = useParams();
  const { data: comments = [], isLoading } = useGetCommentsQuery();
  const { data: users = [] } = useGetUsersQuery();
  const currentUser = useSelector<RootState>((state) => state.user);

  const [userData, setUserData] = useState<UserTypes | undefined>(undefined);
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [currentComment, setCurrentComment] = useState<
    CommentTypes | undefined
  >(undefined);

  useEffect(() => {
    setWrapperHeight(getFooterHeight() + 50);
  }, []);

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
    <Main $minHeight={wrapperHeight}>
      {currentComment && userData ? (
        (currentUser as UserTypes).uuid === uuid ||
        (currentUser as UserTypes).role.type === 'admin' ||
        (currentUser as UserTypes).role.type === 'redactor' ? (
          <CommentForm />
        ) : (
          "You're not authorised"
        )
      ) : null}
    </Main>
  );
};

export default CommentView;
