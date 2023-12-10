import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledMenuListItemLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.lightBlue};
  transition: 200ms color ease-in;

  &.active {
    color: ${({ theme }) => theme.colors.red};
    border-bottom: ${({ theme }) => `0.1rem solid ${theme.colors.red}`};
    transition:
      200ms border-bottom-color ease-in,
      200ms color ease-in;

    &:hover {
      border-bottom-color: ${({ theme }) => theme.colors.white};
    }
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;
