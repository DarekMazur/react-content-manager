import { ChangeEvent, FC } from 'react';

interface InputTypes {
  label: string;
  type: string;
  id: string;
  value: string | boolean;
  // eslint-disable-next-line no-unused-vars
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputTypes> = ({ label, type, id, value, handleOnChange }) => {
  return (
    <div>
      <label htmlFor="username">{label}</label>
      <input
        type={type}
        value={typeof value === 'string' ? value : 'undefined'}
        checked={value as boolean}
        id={id}
        onChange={(e) => handleOnChange(e)}
      />
    </div>
  );
};

export default Input;
