import styled from 'styled-components';
import { StyledButton } from '../Button/Button.styles.ts';

interface IStyledActionButtonProps {
  $delete?: boolean;
}

export const StyledActionButton = styled(
  StyledButton,
)<IStyledActionButtonProps>`
  background-color: ${({ theme, $delete }) =>
    $delete ? theme.colors.red : theme.colors.darkBlue};
  width: 10rem;
  height: 4rem;
  font-size: ${({ theme }) => theme.fontSize.m};
  padding: 0;
  margin: 0;
`;
