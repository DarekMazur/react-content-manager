import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledInLink = styled(Link)`
  color: ${({ theme }) => theme.colors.blue};
  text-decoration: none;
  position: relative;
  transition: 100ms color ease-in;

  &::after {
    content: '';
    position: absolute;
    background-color: ${({ theme }) => theme.colors.red};
    width: 110%;
    height: 0.3rem;
    bottom: 0;
    left: -5%;
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
