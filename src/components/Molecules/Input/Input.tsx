import { ChangeEvent, FC } from 'react';

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
    <div>
      <label htmlFor="username">{label}</label>
      <input
        type={type}
        value={value}
        id={id}
        onChange={(e) => handleOnChange(e)}
      />
    </div>
  );
};

export default Input;
