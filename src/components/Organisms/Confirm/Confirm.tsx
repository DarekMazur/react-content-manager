import { useDispatch, useSelector } from 'react-redux';
import ActionButton from '../../Atoms/ActionButton/ActionButton';
import { PopupWrapper } from '../PopupWrapper/PopupWrapper.styles.ts';
import {
  IPopupTypes,
  RootState,
  clearSelected,
  switchPopup,
  useRemoveArticleMutation,
  useRemoveArticlesMutation,
  useRemoveCommentMutation,
  useRemoveCommentsMutation,
  useRemoveUserMutation,
  useRemoveUsersMutation,
  useRemoveCategoryMutation,
  useRemoveCategoriesMutation,
} from '../../../store';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

const Confirm = () => {
  const { t } = useTranslation();
  const [removeArticle] = useRemoveArticleMutation();
  const [removeArticles] = useRemoveArticlesMutation();
  const [removeUser] = useRemoveUserMutation();
  const [removeUsers] = useRemoveUsersMutation();
  const [removeComment] = useRemoveCommentMutation();
  const [removeComments] = useRemoveCommentsMutation();
  const [removeCategory] = useRemoveCategoryMutation();
  const [removeCategories] = useRemoveCategoriesMutation();
  const dispatch = useDispatch();
  const popup = useSelector<RootState>((state) => state.popup);
  const location = useLocation();

  const popupState = popup as IPopupTypes;

  const counter = popupState.ids ? popupState.ids.length : 0;

  let locationName = location.pathname.slice(1);

  const locationValue = () => {
    switch (location.pathname.slice(1)) {
      case 'users':
        if (counter > 1) {
          return t('confirmation.element.users');
        }
        return `${t('confirmation.element.user')}${
          popupState.title ? ` <strong>${popupState.title}</strong>` : ``
        }`;
      case 'articles':
        if (counter > 1) {
          if (
            Math.floor(counter % 10) === 2 ||
            Math.floor(counter % 10) === 3 ||
            Math.floor(counter % 10) === 4
          ) {
            return t('confirmation.element.articles');
          }
          return t('confirmation.element.articlesMany');
        }
        return `${t('confirmation.element.article')}${
          popupState.title ? ` <strong>${popupState.title}</strong>` : ``
        }`;
      case 'comments':
        if (counter > 1) {
          if (
            Math.floor(counter % 10) === 2 ||
            Math.floor(counter % 10) === 3 ||
            Math.floor(counter % 10) === 4
          ) {
            return t('confirmation.element.comments');
          }
          return t('confirmation.element.commentsMany');
        }
        return `${t('confirmation.element.comment')}${
          popupState.title ? ` <strong>${popupState.title}</strong>` : ``
        }`;
      case 'categories':
        if (counter > 1) {
          if (
            Math.floor(counter % 10) === 2 ||
            Math.floor(counter % 10) === 3 ||
            Math.floor(counter % 10) === 4
          ) {
            return t('confirmation.element.categories');
          }
          return t('confirmation.element.categoriesMany');
        }
        return `${t('confirmation.element.category')}${
          popupState.title ? ` <strong>${popupState.title}</strong>` : ``
        }`;
    }
  };

  const messageDetailsCount = counter > 1 ? counter : undefined;

  const regex = /[^/]+$/;

  if (locationName.search(regex) > 0) {
    const slashIndex = locationName.search(regex);
    locationName = locationName.slice(0, slashIndex - 1);
  }

  const handleDelete = () => {
    if (counter === 1) {
      switch (locationName) {
        case 'articles':
          removeArticle(popupState.ids[0]);
          break;
        case 'users':
          removeUser(popupState.ids[0]);
          break;
        case 'comments':
          removeComment(popupState.ids[0]);
          break;
        case 'categories':
          removeCategory(popupState.ids);
          break;
      }
    } else {
      switch (location.pathname.slice(1)) {
        case 'articles':
          removeArticles(popupState.ids);
          break;
        case 'users':
          removeUsers(popupState.ids);
          break;
        case 'comments':
          removeComments(popupState.ids);
          break;
        case 'categories':
          removeCategories(popupState.ids);
          break;
      }
    }
    dispatch(switchPopup(false));
    dispatch(clearSelected());
  };

  const handleCancel = () => {
    dispatch(switchPopup(false));
    dispatch(clearSelected());
  };

  return (
    <PopupWrapper $isVisible={popupState.isOpen}>
      <div>
        <p
          dangerouslySetInnerHTML={{
            __html: t('confirmation.message', {
              count: messageDetailsCount,
              element: locationValue(),
            }),
          }}
        />
        <div>
          <ActionButton handleClick={handleDelete} isDel>
            {t('confirmation.delete')}
          </ActionButton>
          <ActionButton handleClick={handleCancel}>
            {t('confirmation.cancel')}
          </ActionButton>
        </div>
      </div>
    </PopupWrapper>
  );
};

export default Confirm;
