import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledInLink = styled(Link)`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-decoration: none;
  position: relative;
  transition: 100ms color ease-in;

  &::after {
    content: '';
    position: absolute;
    background-color: ${({ theme }) => theme.colors.red};
    width: calc(100% + 4px);
    height: 0.2rem;
    bottom: 0;
    left: -2px;
    transform: scaleX(0);
    transform-origin: 0 0;
    transition: 100ms transform ease-in;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.red};

    &::after {
      transform: scaleX(1);
    }
  }
`;
