import { ChangeEvent, FC } from 'react';
import { StyledInputSelect } from './InputSelect.styles';
import { FormWrapper } from '../../Organisms/UserForm/UserForm.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { UserTypes } from '../../../types/dataTypes';

interface SelectTypes {
  value: string;
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
      <label htmlFor="role">Role: </label>
      <StyledInputSelect
        name="role"
        id="role"
        value={value}
        onChange={(e) => handleOnChange(e)}
        disabled={
          (currentUser as UserTypes).uuid === uuid ||
          (currentUser as UserTypes).role.type !== 'admin'
        }
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledInputSelect>
    </FormWrapper>
  );
};

export default InputSelect;
