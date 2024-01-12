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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label htmlFor="username">{label}</label>
      <input
        style={{padding: '1rem', borderRadius: '0.5rem', border: '0.1rem solid'}}
        type={type}
        value={value}
        id={id}
        onChange={(e) => handleOnChange(e)}
      />
    </div>
  );
};

export default Input;
