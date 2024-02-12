import styled from 'styled-components';

interface IStyledSortingTypes {
  $color?: boolean;
  $order?: string;
}
export const StyledTableSorting = styled.div<IStyledSortingTypes>`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  font-size: 1rem;

  svg {
    cursor: pointer;

    &:first-of-type {
      color: ${({ $color, $order, theme }) =>
        $color && $order === 'asc'
          ? theme.colors.white
          : theme.colors.darkGrey};
    }

    &:last-of-type {
      color: ${({ $color, $order, theme }) =>
        $color && $order === 'desc'
          ? theme.colors.white
          : theme.colors.darkGrey};
    }
  }
`;
