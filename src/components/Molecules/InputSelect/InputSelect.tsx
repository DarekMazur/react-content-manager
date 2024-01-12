import { ChangeEvent, FC } from 'react';
import { StyledInputSelect } from './InputSelect.styles';
import { FormWrapper } from '../../Organisms/UserForm/UserForm.styles';

interface SelectTypes {
  value: string;
  options: string[];
  // eslint-disable-next-line no-unused-vars
  handleOnChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelect: FC<SelectTypes> = ({ value, handleOnChange, options }) => {
  return (
    <FormWrapper $direction="column" $gap={0.4}>
      <label htmlFor="role">Role: </label>
      <StyledInputSelect
        name="role"
        id="role"
        value={value}
        onChange={(e) => handleOnChange(e)}
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
