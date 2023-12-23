import styled from 'styled-components';

interface StyledPaginationNumberProps {
  $number: number;
  $current: number;
}

export const StyledPagination = styled.div`
  min-width: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledPaginationNumber = styled.span<StyledPaginationNumberProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.3rem;
  border-radius: 0.3rem;
  height: 3rem;
  width: 3rem;
  padding: 0 0.5rem;
  font-weight: ${({ $number, $current, theme }) =>
    $number === $current ? theme.fontWeight.bold : 'inherit'};
  color: ${({ $number, $current, theme }) =>
    $number === $current ? theme.colors.red : 'inherit'};
  cursor: ${({ $number, $current }) =>
    $number === $current ? 'auto' : 'pointer'};
  transition: 200ms background-color ease-in-out;

  &:hover {
    background-color: ${({ theme, $current, $number }) =>
      $current !== $number && theme.colors.lightBlue};
  }
`;
