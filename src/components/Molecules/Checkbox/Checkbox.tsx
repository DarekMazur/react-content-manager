import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { theme } from '../../../utils/themes/theme';
import { StyledCheckbox } from './Checkbox.styles.ts';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface ICheckboxProps {
  isChecked?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleClick: (
    // eslint-disable-next-line no-unused-vars
    id: string,
    // eslint-disable-next-line no-unused-vars
    type: string | undefined,
    // eslint-disable-next-line no-unused-vars
    isDisabled?: boolean,
  ) => void;
  uuid: string;
  type?: string;
  isDisabled?: boolean;
}

const Checkbox: FC<ICheckboxProps> = ({
  isChecked = false,
  isDisabled = false,
  handleClick,
  uuid,
  type,
}) => {
  if (isDisabled) {
    return (
      <Tippy
        content={<span>You can't select yourself</span>}
        animation={'fade'}
        theme={'material'}
        trigger={'click'}
      >
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
      </Tippy>
    );
  }
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
