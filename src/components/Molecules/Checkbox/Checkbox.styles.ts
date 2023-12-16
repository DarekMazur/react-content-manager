import styled from 'styled-components';

interface StyledCheckboxProps {
  $checked: boolean;
}

export const StyledCheckbox = styled.span<StyledCheckboxProps>`
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
    border: ${({ theme }) => `0.1rem solid ${theme.colors.darkBlue}`};
    background-color: ${({ theme, $checked }) =>
      $checked ? theme.colors.darkBlue : 'transparent'};
    padding: 0.2rem;
  }
`;
