import styled from 'styled-components';
import { StyledButton } from '../Button/Button.styles.ts';

interface StyledActionButtonProps {
  $delete?: boolean;
}

export const StyledActionButton = styled(StyledButton)<StyledActionButtonProps>`
  background-color: ${({ theme, $delete }) =>
    $delete ? theme.colors.red : theme.colors.darkBlue};
  width: 9rem;
  height: 3rem;
  font-size: ${({ theme }) => theme.fontSize.m};
  padding: 0;
  margin: 0;
`;
