import { ChangeEvent, FC } from 'react';
import {
  CheckboxFill,
  CheckboxInput,
  CheckboxLabel,
  CheckboxSetting,
  CheckboxSwitch,
  CheckboxText,
  StyledCheckboxWrapper,
} from './InputCheckbox.styles.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index.ts';
import { UserTypes } from '../../../types/dataTypes.ts';

interface CheckboxTypes {
  label: string;
  id: string;
  value?: boolean;
  uuid: string;
  // eslint-disable-next-line no-unused-vars
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputCheckbox: FC<CheckboxTypes> = ({
  label,
  id,
  value,
  uuid,
  handleOnChange,
}) => {
  const currentUser = useSelector<RootState>((state) => state.user);

  return (
    <StyledCheckboxWrapper>
      <CheckboxSetting>
        <CheckboxLabel>{label}</CheckboxLabel>
        <CheckboxSwitch>
          <CheckboxInput
            type="checkbox"
            role={id}
            name="switch1"
            id={id}
            checked={value}
            $isChecked={value || false}
            onChange={(e) => handleOnChange(e)}
            disabled={
              (currentUser as UserTypes).uuid === uuid ||
              (currentUser as UserTypes).role.type !== 'admin'
            }
          />
          <CheckboxFill aria-hidden="true">
            <CheckboxText $isChecked={value || false}>YES</CheckboxText>
            <CheckboxText $isChecked={value || false}>NO</CheckboxText>
          </CheckboxFill>
        </CheckboxSwitch>
      </CheckboxSetting>
    </StyledCheckboxWrapper>
  );
};

export default InputCheckbox;