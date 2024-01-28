import { ChangeEvent, FC } from 'react';
import { StyledInput } from './Input.styles.ts';
import { FormWrapper } from '../../Organisms/Forms/UserForm/UserForm.styles.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { UserTypes } from '../../../types/dataTypes.ts';

interface InputTypes {
  label: string;
  type: string;
  id: string;
  value: string;
  uuid: string;
  // eslint-disable-next-line no-unused-vars
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputTypes> = ({
  label,
  type,
  id,
  value,
  uuid,
  handleOnChange,
}) => {
  const currentUser = useSelector<RootState>((state) => state.user);

  return (
    <FormWrapper $direction="column" $gap={0.4}>
      <label htmlFor="username">{label}</label>
      <StyledInput
        type={type}
        value={value}
        id={id}
        onChange={(e) => handleOnChange(e)}
        disabled={
          (currentUser as UserTypes).uuid !== uuid &&
          (currentUser as UserTypes).role.type !== 'admin'
        }
      />
    </FormWrapper>
  );
};

export default Input;
