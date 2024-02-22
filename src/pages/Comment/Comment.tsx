import { useParams } from 'react-router';
import { RootState, useGetCommentsQuery, useGetUsersQuery } from '../../store';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Main } from '../../components/Organisms/Main/Main.styles';
import CommentForm from '../../components/Organisms/Forms/CommentForm/CommentForm';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';
import Unauthorised from '../../components/Templates/Unauthorised/Unauthorised.tsx';
import { IUserData } from '../../types/userTypes.ts';
import { ICommentData } from '../../types/commentTypes.ts';

const CommentView = () => {
  const { uuid } = useParams();
  const height = useMinHeight();
  const { data: comments, isLoading } = useGetCommentsQuery();
  const { data: users = [] } = useGetUsersQuery();
  const currentUser = useSelector<RootState>((state) => state.user);

  const [userData, setUserData] = useState<IUserData | undefined>(undefined);
  const [currentComment, setCurrentComment] = useState<
    ICommentData | undefined
  >(undefined);

  useEffect(() => {
    if (currentComment && users.length > 0) {
      // setUserData(
      //   users.find(
      //     (user) => user.id === currentComment.attributes.author.data.id,
      //   ),
      // );
      setUserData(users.find((user) => user.id === 1));
    }
  }, [currentComment, users]);

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
      {currentComment && userData ? (
        // (currentUser as IUserData).uuid ===
        //   currentComment.attributes.article.data.attributes.author.data
        //     .attributes.uuid ||
        // (currentUser as IUserData).role.type === 'admin' ||
        // (currentUser as IUserData).role.type === 'redactor' ? (
        //   <CommentForm />
        // ) : (
        //   <Unauthorised />
        // )
        (currentUser as IUserData).id === 1 ||
        (currentUser as IUserData).role.type === 'admin' ||
        (currentUser as IUserData).role.type === 'redactor' ? (
          <CommentForm />
        ) : (
          <Unauthorised />
        )
      ) : null}
    </Main>
  );
};

export default CommentView;
