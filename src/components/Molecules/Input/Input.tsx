import { ChangeEvent, FC } from 'react';
import { StyledInput } from './Input.styles.ts';
import { FormWrapper } from '../../Organisms/UserForm/UserForm.styles';

interface InputTypes {
  label: string;
  type: string;
  id: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputTypes> = ({ label, type, id, value, handleOnChange }) => {
  return (
    <FormWrapper $direction="column" $gap={0.4}>
      <label htmlFor="username">{label}</label>
      <StyledInput
        type={type}
        value={value}
        id={id}
        onChange={(e) => handleOnChange(e)}
      />
    </FormWrapper>
  );
};

export default Input;
