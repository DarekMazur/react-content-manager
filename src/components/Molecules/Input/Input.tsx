import { ChangeEvent, KeyboardEvent, FC } from 'react';
import { StyledInput } from './Input.styles.ts';
import { FormWrapper } from '../../Organisms/Forms/UserForm/UserForm.styles.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { IStrapiUser } from '../../../types/userTypes.ts';
import Astrix from "../../Atoms/Astrix/Astrix.tsx";

interface IInputTypes {
  label: string;
  type: string;
  id: string;
  value: string;
  uuid: string;
  placeholder?: string;
  required?: boolean;
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
  required,
  handleOnChange,
  handleKeyPress,
}) => {
  const currentUser = useSelector<RootState>((state) => state.user);

  return (
    <FormWrapper $direction="column" $gap={0.4}>
      <label htmlFor="username">{label}{required ? <Astrix /> : null}</label>
      <StyledInput
        type={type}
        value={value}
        id={id}
        placeholder={placeholder}
        required={required}
        onChange={(e) => handleOnChange(e)}
        onKeyUp={(e) => (handleKeyPress ? handleKeyPress(e) : {})}
        disabled={
          (currentUser as IStrapiUser).uuid !== uuid &&
          (currentUser as IStrapiUser).role.type !== 'administrator'
        }
      />
    </FormWrapper>
  );
};

export default Input;
