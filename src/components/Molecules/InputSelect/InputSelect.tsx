import { ChangeEvent, FC } from 'react';
import { StyledInputSelect } from './InputSelect.styles';
import { FormWrapper } from '../../Organisms/Forms/UserForm/UserForm.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { RoleTypes, UserTypes } from '../../../types/dataTypes';

interface SelectTypes {
  value: RoleTypes;
  options: string[];
  uuid: string;
  // eslint-disable-next-line no-unused-vars
  handleOnChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelect: FC<SelectTypes> = ({
  value,
  uuid,
  handleOnChange,
  options,
}) => {
  const currentUser = useSelector<RootState>((state) => state.user);

  return (
    <FormWrapper $direction="column" $gap={0.4}>
      {value ? (
        <>
          <label htmlFor="role">Role:</label>
          <StyledInputSelect
            name="role"
            id="role"
            value={value.name}
            // defaultValue={value.name}
            onChange={(e) => handleOnChange(e)}
            disabled={
              (currentUser as UserTypes).uuid === uuid ||
              (currentUser as UserTypes).role.type !== 'admin'
            }
          >
            {options.map((option) => (
              <option key={option} value={option} label={option} />
            ))}
          </StyledInputSelect>
        </>
      ) : null}
    </FormWrapper>
  );
};

export default InputSelect;
