import ActionButton from '../../Atoms/ActionButton/ActionButton';
import { PopupWrapper } from '../PopupWrapper/PopupWrapper.styles.ts';

const Confirm = () => {
  return (
    <PopupWrapper>
      <div>
        <p>Are you sure you? This is permanent</p>
        <ActionButton handleClick={() => {}} isDel>
          delete
        </ActionButton>
        <ActionButton handleClick={() => {}}>cancel</ActionButton>
      </div>
    </PopupWrapper>
  );
};

export default Confirm;
