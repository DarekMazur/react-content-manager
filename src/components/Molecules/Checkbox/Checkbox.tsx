import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { theme } from '../../../utils/themes/theme';
import { StyledCheckbox } from './Checkbox.styles.ts';

interface CheckboxProps {
  isChecked?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleClick: (id: string, type: string | undefined, isDisabled?: boolean) => void;
  uuid: string;
  type?: string;
  isDisabled?: boolean
}

const Checkbox: FC<CheckboxProps> = ({
  isChecked = false,
  isDisabled = false,
  handleClick,
  uuid,
  type,
}) => {
  return (
    <StyledCheckbox
      $checked={isChecked}
      $disabled={isDisabled}
      onClick={() => handleClick(uuid, type, isDisabled)}
    >
      <span>
        {isChecked ? (
          <FontAwesomeIcon
            style={{
              color: isChecked ? theme.colors.white : theme.colors.darkBlue,
              fontSize: '1.4rem',
            }}
            icon={['fas', 'check']}
          />
        ) : null}
      </span>
    </StyledCheckbox>
  );
};

export default Checkbox;
