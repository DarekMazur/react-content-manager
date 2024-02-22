import { ChangeEvent, FC } from 'react';
import { StyledInputSelect } from './InputSelect.styles';
import { FormWrapper } from '../../Organisms/Forms/UserForm/UserForm.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { IStrapiRoles } from '../../../types/roleTypes.ts';
import { IStrapiUser } from '../../../types/userTypes.ts';

interface ISelectTypes {
  value: IStrapiRoles;
  label: string;
  options: string[];
  uuid: string;
  // eslint-disable-next-line no-unused-vars
  handleOnChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelect: FC<ISelectTypes> = ({
  value,
  label,
  uuid,
  handleOnChange,
  options,
}) => {
  const currentUser = useSelector<RootState>((state) => state.user);

  return (
    <FormWrapper $direction="column" $gap={0.4}>
      {value ? (
        <>
          <label htmlFor="role">{label}</label>
          <StyledInputSelect
            name="role"
            id="role"
            value={value.name}
            // defaultValue={value.name}
            onChange={(e) => handleOnChange(e)}
            disabled={
              (currentUser as IStrapiUser).uuid === uuid ||
              (currentUser as IStrapiUser).role.type !== 'administrator'
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
