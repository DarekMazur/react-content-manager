import { styled } from 'styled-components';

interface StyledStatusProps {
  $status: boolean;
}

export const StyledStatus = styled.span<StyledStatusProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background-color: ${({ $status, theme }) =>
    $status ? theme.colors.green : theme.colors.brightBlue};
  padding: 0.2rem;
`;
