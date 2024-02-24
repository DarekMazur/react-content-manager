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
} from '../../../store';
// import {
//   IArticleDataTypes,
//   ICategoriesTypes,
//   ICommentTypes,
//   IUserTypes,
// } from '../../../types/dataTypes.ts';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { IArticleData } from '../../../types/articleTypes.ts';
import { IStrapiUser, IUserData } from '../../../types/userTypes.ts';

interface IMultiActionProps {
  counter: number;
}

const MultiAction: FC<IMultiActionProps> = ({ counter }) => {
  const { t } = useTranslation();
  const selected = useSelector<RootState>((state) => state.selected);
  const selectedUsers = useSelector<RootState>((state) => state.selectedUsers);
  const selectedCategories = useSelector<RootState>(
    (state) => state.selectedCategories,
  );
  const selectedComments = useSelector<RootState>(
    (state) => state.selectedComments,
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const [updateArticle] = useUpdateArticleMutation();
  const [updateUser] = useUpdateUserMutation();

  const dataToUpdate = (data: IArticleData) => {
    return {
      data: {
        id: data.id,
        ...data.attributes,
      },
    };
  };

  const handlePublish = () => {
    (selected as IArticleData[]).forEach((article) => {
      article = {
        id: article.id,
        attributes: {
          ...article.attributes,
          publishedAt: article.attributes.publishedAt
            ? article.attributes.publishedAt
            : new Date(),
        },
      };
      updateArticle(dataToUpdate(article));
    });
    dispatch(clearSelected());
  };

  const handleUnpublish = () => {
    (selected as IArticleData[]).forEach((article) => {
      article = {
        id: article.id,
        attributes: {
          ...article.attributes,
          publishedAt: null,
        },
      };
      updateArticle(dataToUpdate(article));
    });
    dispatch(clearSelected());
  };

  const handleBlock = () => {
    (selectedUsers as IStrapiUser[]).forEach((user) => {
      user = {
        ...user,
        blocked: true,
      };
      updateUser({ ...user, newRole: user.role });
    });
    dispatch(clearUsersSelected());
  };

  const handleUnblock = () => {
    (selectedUsers as IStrapiUser[]).forEach((user) => {
      user = {
        ...user,
        blocked: false,
      };
      updateUser({ ...user, newRole: user.role });
    });
    dispatch(clearUsersSelected());
  };

  const handleDelete = () => {
    const ids: number[] = [];
    let singleTitle: string | undefined = undefined;
    switch (location.pathname.slice(1)) {
      case 'articles':
        {
          (selected as IArticleDataTypes[]).forEach((element) => {
            ids.push(element.id);
          });
          singleTitle =
            ids.length === 1
              ? (selected as IArticleDataTypes[]).find(
                  (element) => element.id === ids[0],
                )?.title
              : undefined;
        }
        break;
      case 'users':
        {
          (selectedUsers as IUserTypes[]).forEach((element) => {
            ids.push(element.id);
          });
          singleTitle =
            ids.length === 1
              ? (selectedUsers as IUserTypes[]).find(
                  (element) => element.id === ids[0],
                )?.username
              : undefined;
        }
        break;
      case 'comments':
        {
          (selectedComments as ICommentTypes[]).forEach((element) => {
            ids.push(element.id);
          });
          singleTitle = undefined;
        }
        break;
      case 'categories':
        {
          (selectedCategories as ICategoriesTypes[]).forEach((element) => {
            ids.push(element.id);
          });
          singleTitle = undefined;
        }
        break;
    }

    dispatch(
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
            <ActionButton handleClick={handlePublish}>
              {t('form.multiAction.button.publish')}
            </ActionButton>{' '}
            <ActionButton handleClick={handleUnpublish}>
              {t('form.multiAction.button.unpublish')}
            </ActionButton>{' '}
          </>
        );
      case 'users':
        return (
          <>
            <ActionButton handleClick={handleBlock}>
              {t('form.multiAction.button.block')}
            </ActionButton>{' '}
            <ActionButton handleClick={handleUnblock}>
              {t('form.multiAction.button.unblock')}
            </ActionButton>{' '}
          </>
        );
    }
  };

  const locationValue = () => {
    switch (location.pathname.slice(1)) {
      case 'users':
        if (counter > 1) {
          return t('form.multiAction.element.users');
        }
        return t('form.multiAction.element.user');
      case 'articles':
        if (counter > 1) {
          if (
            Math.floor(counter % 10) === 2 ||
            Math.floor(counter % 10) === 3 ||
            Math.floor(counter % 10) === 4
          ) {
            return t('form.multiAction.element.articles');
          }
          return t('form.multiAction.element.articlesMany');
        }
        return t('form.multiAction.element.article');
      case 'comments':
        if (counter > 1) {
          if (
            Math.floor(counter % 10) === 2 ||
            Math.floor(counter % 10) === 3 ||
            Math.floor(counter % 10) === 4
          ) {
            return t('form.multiAction.element.comments');
          }
          return t('form.multiAction.element.commentsMany');
        }
        return t('form.multiAction.element.comment');
      case 'categories':
        if (counter > 1) {
          if (
            Math.floor(counter % 10) === 2 ||
            Math.floor(counter % 10) === 3 ||
            Math.floor(counter % 10) === 4
          ) {
            return t('form.multiAction.element.categories');
          }
          return t('form.multiAction.element.categoriesMany');
        }
        return t('form.multiAction.element.category');
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
        {t('form.multiAction.selected', {
          count: counter,
          element: locationValue(),
        })}
      </P>
      {getButtons()}
      <ActionButton handleClick={handleDelete} isDel>
        {t('form.multiAction.button.delete')}
      </ActionButton>
    </Wrapper>
  );
};

export default MultiAction;
