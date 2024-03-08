import styled from 'styled-components';

interface IStyledCheckboxProps {
  $checked: boolean;
  $disabled: boolean;
}

export const StyledCheckbox = styled.span<IStyledCheckboxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 0.4rem;
    border: ${({ theme, $disabled }) =>
      $disabled ? theme.colors.grey : `0.1rem solid ${theme.colors.darkBlue}`};
    background-color: ${({ theme, $checked, $disabled }) =>
      $disabled
        ? theme.colors.grey
        : $checked
          ? theme.colors.darkBlue
          : 'transparent'};
    padding: 0.2rem;
  }
`;
