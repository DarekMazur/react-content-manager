import styled from 'styled-components';

interface FormTypes {
  $gap?: number;
  $direction?: string;
  $minWidth?: number;
  $maxWidth?: number;
}

interface FormButtonTypes {
  $type: string;
}

export const StyledUserForm = styled.form`
  display: flex;
  gap: 2rem;
  margin: 0 3rem;
  justify-content: center;
`;

export const FormWrapper = styled.div<FormTypes>`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction ? $direction : 'row')};
  gap: ${({ $gap }) => ($gap ? `${$gap}rem` : 'unset')};
  min-width: ${({ $minWidth }) => ($minWidth ? `${$minWidth}rem` : 'unset')};
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}rem` : 'unset')};
`;

export const FormButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 2rem;
`;

export const EditButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  min-width: -webkit-fill-available;
`;

export const FormButton = styled.button<FormButtonTypes>`
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme, $type }) =>
    $type === 'submit' ? theme.fontWeight.bold : theme.fontWeight.regular};
  padding: 0.5rem 1rem;
  background-color: ${({ $type, theme }) =>
    $type === 'submit'
      ? theme.colors.blue
      : $type === 'reset'
        ? theme.colors.yellow
        : theme.colors.red};
  width: 15rem;
  border: 0.1rem solid;
  border-radius: 0.5rem;
  cursor: pointer;

  &:active {
    box-shadow: ${({ theme }) =>
      `inset 0.1rem 0.1rem 1rem ${theme.colors.darkBlue}`};
  }
`;
