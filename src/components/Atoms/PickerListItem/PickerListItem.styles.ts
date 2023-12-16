import { styled } from 'styled-components';

interface StyledPickerItem {
  $perPage: number;
  $value: number;
}

export const StyledPickerListItem = styled.li<StyledPickerItem>`
  padding: 0.3rem 0;
  color: ${({ $perPage, $value, theme }) =>
    $perPage === $value ? theme.colors.darkBlue : theme.colors.blue};

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightBlue};
  }
`;
