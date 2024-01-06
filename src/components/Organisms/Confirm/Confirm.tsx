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
} from '../../../store/index.ts';

const Confirm = () => {
  const [removeArticle] = useRemoveArticleMutation();
  const [removeArticles] = useRemoveArticlesMutation();
  const dispach = useDispatch();
  const popup = useSelector<RootState>((state) => state.popup);

  const popupState = popup as PopupTypes;

  const counter = popupState.ids ? popupState.ids.length : 0;

  const handleDelete = () => {
    if (counter === 1) {
      removeArticle(popupState.ids[0]);
    } else {
      removeArticles(popupState.ids);
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
      {/* {console.log(selected)} */}
      <div>
        <p>
          Are you sure you want to delelte {counter > 1 ? counter : null}{' '}
          article
          {counter > 1 ? 's' : <strong> {popupState.title}</strong>}? This
          action is permanent
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
