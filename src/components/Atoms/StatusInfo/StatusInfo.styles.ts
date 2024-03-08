import { styled } from 'styled-components';

interface IStyledStatusProps {
  $status: boolean;
  $isRed?: boolean;
}

export const StyledStatus = styled.span<IStyledStatusProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background-color: ${({ $status, $isRed, theme }) =>
    $status
      ? theme.colors.green
      : $isRed
        ? theme.colors.red
        : theme.colors.brightBlue};
  padding: 0.2rem;
`;
