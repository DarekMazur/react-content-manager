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

  span {
    padding: 0 0.5rem;
  }
`;

export const StyledPaginationNumber = styled.span<StyledPaginationNumberProps>`
  padding: 0 0.5rem;
  font-weight: ${({ $number, $current, theme }) =>
    $number === $current ? theme.fontWeight.bold : 'inherit'};
  color: ${({ $number, $current, theme }) =>
    $number === $current ? theme.colors.red : 'inherit'};
  cursor: ${({ $number, $current }) =>
    $number === $current ? 'auto' : 'pointer'};
`;
