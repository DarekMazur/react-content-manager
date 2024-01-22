import { FC } from 'react';
import ActionButton from '../../Atoms/ActionButton/ActionButton.tsx';
import Wrapper from '../../Organisms/Wrapper/Wrapper.tsx';
import P from '../../Atoms/Paragraph/P.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  clearSelected,
  clearUsersSelected,
  switchPopup,
  useUpdateArticleMutation,
  useUpdateUserMutation,
} from '../../../store/index.ts';
import {
  ArticleDataTypes,
  CommentTypes,
  UserTypes,
} from '../../../types/dataTypes.ts';
import { useLocation } from 'react-router';

interface MultiActionProps {
  counter: number;
}

const MultiAction: FC<MultiActionProps> = ({ counter }) => {
  const selected = useSelector<RootState>((state) => state.selected);
  const selectedUsers = useSelector<RootState>((state) => state.selectedUsers);
  const selectedComments = useSelector<RootState>(
    (state) => state.selectedComments,
  );
  const dispach = useDispatch();
  const location = useLocation();
  const [updateArticle] = useUpdateArticleMutation();
  const [updateUser] = useUpdateUserMutation();

  const handlePublish = () => {
    (selected as ArticleDataTypes[]).forEach((article) => {
      article = {
        ...article,
        publishedAt: article.publishedAt ? article.publishedAt : new Date(),
      };
      updateArticle({ ...article });
    });
    dispach(clearSelected());
  };

  const handleUnpublish = () => {
    (selected as ArticleDataTypes[]).forEach((article) => {
      article = {
        ...article,
        publishedAt: null,
      };
      updateArticle({ ...article });
    });
    dispach(clearSelected());
  };

  const handleBlock = () => {
    (selectedUsers as UserTypes[]).forEach((user) => {
      user = {
        ...user,
        blocked: true,
      };
      updateUser({ ...user });
    });
    dispach(clearUsersSelected());
  };

  const handleUnblock = () => {
    (selectedUsers as UserTypes[]).forEach((user) => {
      user = {
        ...user,
        blocked: false,
      };
      updateUser({ ...user });
    });
    dispach(clearUsersSelected());
  };

  const handleDelete = () => {
    const ids: number[] = [];
    let singleTitle: string | undefined = undefined;
    switch (location.pathname.slice(1)) {
      case 'articles':
        {
          (selected as ArticleDataTypes[]).forEach((element) => {
            ids.push(element.id);
          });
          singleTitle =
            ids.length === 1
              ? (selected as ArticleDataTypes[]).find(
                  (element) => element.id === ids[0],
                )?.title
              : undefined;
        }
        break;
      case 'users':
        {
          (selectedUsers as UserTypes[]).forEach((element) => {
            ids.push(element.id);
          });
          singleTitle =
            ids.length === 1
              ? (selectedUsers as UserTypes[]).find(
                  (element) => element.id === ids[0],
                )?.username
              : undefined;
        }
        break;
      case 'comments':
        {
          (selectedComments as CommentTypes[]).forEach((element) => {
            ids.push(element.id);
          });
          singleTitle = undefined;
        }
        break;
    }

    dispach(
      switchPopup({
        isOpen: true,
        ids,
        title: singleTitle,
      }),
    );
  };

  const getButtons = () => {
    switch (location.pathname.slice(1)) {
      case 'articles':
        return (
          <>
            <ActionButton handleClick={handlePublish}>publish</ActionButton>{' '}
            <ActionButton handleClick={handleUnpublish}>unpublish</ActionButton>{' '}
          </>
        );
      case 'users':
        return (
          <>
            <ActionButton handleClick={handleBlock}>block</ActionButton>{' '}
            <ActionButton handleClick={handleUnblock}>unblock</ActionButton>{' '}
          </>
        );
    }
  };

  return (
    <Wrapper
      width="100%"
      justify="flex-start"
      align="center"
      padding="2rem 2.4vw"
    >
      <P weight="bold">
        {counter} {location.pathname.slice(1, -1)}
        {counter > 1 ? 's' : null} selected{' '}
      </P>
      {getButtons()}
      <ActionButton handleClick={handleDelete} isDel>
        delete
      </ActionButton>
    </Wrapper>
  );
};

export default MultiAction;
