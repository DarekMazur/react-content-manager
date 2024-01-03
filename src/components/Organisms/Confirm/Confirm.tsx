import { useDispatch, useSelector } from 'react-redux';
import ActionButton from '../../Atoms/ActionButton/ActionButton';
import { PopupWrapper } from '../PopupWrapper/PopupWrapper.styles.ts';
import {
  RootState,
  clearSelected,
  removeArticle,
  switchPopup,
} from '../../../store/index.ts';
import { TablePostDataTypes } from '../Table/Table.tsx';

const Confirm = () => {
  const dispach = useDispatch();
  const selected = useSelector<RootState>((state) => state.selected);
  const isPopup = useSelector<RootState>((state) => state.popup);

  const counter = (selected as TablePostDataTypes[]).length;

  const handleDelete = () => {
    (selected as TablePostDataTypes[]).forEach((article) =>
      dispach(removeArticle(article)),
    );

    dispach(switchPopup(false));
    dispach(clearSelected());
  };

  const handleCancel = () => {
    dispach(switchPopup(false));
  };
  return (
    <PopupWrapper $isVisible={isPopup as boolean}>
      <div>
        <p>
          Are you sure you want to delelte {counter > 1 ? counter : null}{' '}
          article
          {counter > 1 ? (
            's'
          ) : (
            <strong> {(selected as TablePostDataTypes[])[0]?.title}</strong>
          )}
          ? This action is permanent
        </p>
        <ActionButton handleClick={handleDelete} isDel>
          delete
        </ActionButton>
        <ActionButton handleClick={handleCancel}>cancel</ActionButton>
      </div>
    </PopupWrapper>
  );
};

export default Confirm;
