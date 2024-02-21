import { ChangeEvent, KeyboardEvent, FC } from 'react';
import { StyledInput } from './Input.styles.ts';
import { FormWrapper } from '../../Organisms/Forms/UserForm/UserForm.styles.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { IUserTypes } from '../../../types/dataTypes.ts';

interface IInputTypes {
  label: string;
  type: string;
  id: string;
  value: string;
  uuid: string;
  placeholder?: string;
  // eslint-disable-next-line no-unused-vars
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  handleKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const Input: FC<IInputTypes> = ({
  label,
  type,
  id,
  value,
  uuid,
  placeholder,
  handleOnChange,
  handleKeyPress,
}) => {
  const currentUser = useSelector<RootState>((state) => state.user);

  return (
    <FormWrapper $direction="column" $gap={0.4}>
      <label htmlFor="username">{label}</label>
      <StyledInput
        type={type}
        value={value}
        id={id}
        placeholder={placeholder}
        onChange={(e) => handleOnChange(e)}
        onKeyUp={(e) => (handleKeyPress ? handleKeyPress(e) : {})}
        disabled={
          (currentUser as IUserTypes).uuid !== uuid &&
          (currentUser as IUserTypes).role.type !== 'administrator'
        }
      />
    </FormWrapper>
  );
};

export default Input;
