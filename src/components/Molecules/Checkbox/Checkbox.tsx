import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { theme } from '../../../utils/themes/theme';
import { StyledCheckbox } from './Checkbox.styles.ts';

interface CheckboxProps {
  isChecked: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ isChecked }) => {
  return (
    <StyledCheckbox $checked={isChecked}>
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
