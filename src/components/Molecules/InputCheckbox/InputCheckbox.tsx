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
import { RootState } from '../../../store';
import { IUserTypes } from '../../../types/dataTypes.ts';
import { useTranslation } from 'react-i18next';

interface ICheckboxTypes {
  label: string;
  id: string;
  value?: boolean;
  uuid?: string;
  // eslint-disable-next-line no-unused-vars
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputCheckbox: FC<ICheckboxTypes> = ({
  label,
  id,
  value,
  uuid,
  handleOnChange,
}) => {
  const { t } = useTranslation();
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
              uuid
                ? (currentUser as IUserTypes).uuid === uuid ||
                  (currentUser as IUserTypes).role.type !== 'administrator'
                : false
            }
          />
          <CheckboxFill aria-hidden="true">
            <CheckboxText $isChecked={value || false}>
              {t('form.checkbox.yes')}
            </CheckboxText>
            <CheckboxText $isChecked={value || false}>
              {t('form.checkbox.no')}
            </CheckboxText>
          </CheckboxFill>
        </CheckboxSwitch>
      </CheckboxSetting>
    </StyledCheckboxWrapper>
  );
};

export default InputCheckbox;
