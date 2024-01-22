import { useDispatch, useSelector } from 'react-redux';
import ActionButton from '../../Atoms/ActionButton/ActionButton';
import { PopupWrapper } from '../PopupWrapper/PopupWrapper.styles.ts';
import {
  PopupTypes,
  RootState,
  clearSelected,
  switchPopup,
  useRemoveArticleMutation,
  useRemoveArticlesMutation,
  useRemoveCommentMutation,
  useRemoveCommentsMutation,
  useRemoveUserMutation,
  useRemoveUsersMutation,
} from '../../../store/index.ts';
import { useLocation } from 'react-router';

const Confirm = () => {
  const [removeArticle] = useRemoveArticleMutation();
  const [removeArticles] = useRemoveArticlesMutation();
  const [removeUser] = useRemoveUserMutation();
  const [removeUsers] = useRemoveUsersMutation();
  const [removeComment] = useRemoveCommentMutation();
  const [removeComments] = useRemoveCommentsMutation();
  const dispach = useDispatch();
  const popup = useSelector<RootState>((state) => state.popup);
  const location = useLocation();

  const popupState = popup as PopupTypes;

  const counter = popupState.ids ? popupState.ids.length : 0;

  const handleDelete = () => {
    if (counter === 1) {
      switch (location.pathname.slice(1)) {
        case 'articles':
          removeArticle(popupState.ids[0]);
          break;
        case 'users':
          removeUser(popupState.ids[0]);
          break;
        case 'comments':
          removeComment(popupState.ids[0]);
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
      }
    }
    dispach(switchPopup(false));
    dispach(clearSelected());
  };

  const handleCancel = () => {
    dispach(switchPopup(false));
    dispach(clearSelected());
  };
  return (
    <PopupWrapper $isVisible={popupState.isOpen}>
      <div>
        <p>
          Are you sure you want to delelte {counter > 1 ? counter : null}{' '}
          {location.pathname.slice(1, -1)}
          {counter > 1 ? (
            's'
          ) : (
            <strong>{popupState.title ? ` ${popupState.title}` : null}</strong>
          )}
          ? This action is permanent
        </p>
        <div>
          <ActionButton handleClick={handleDelete} isDel>
            delete
          </ActionButton>
          <ActionButton handleClick={handleCancel}>cancel</ActionButton>
        </div>
      </div>
    </PopupWrapper>
  );
};

export default Confirm;
