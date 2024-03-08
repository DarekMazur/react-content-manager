import styled, { keyframes } from 'styled-components';

const borderScale = keyframes`
  0% {
    border: 5px solid white;
  }
  50% {
    border: 25px solid #3498db;
  }
  100% {
    border: 5px solid white;
  }
`;

export const Loading = styled.div<{
  $size?: number;
  $margin?: number | string;
}>`
  width: ${({ $size }) => ($size ? `${$size}rem` : '35rem')};
  height: ${({ $size }) => ($size ? `${$size}rem` : '35rem')};
  margin: ${({ $margin }) => ($margin ? $margin : '0 auto')};
  position: relative;
  border: ${({ theme }) => `0.5rem solid ${theme.colors.darkBlue}`};
  border-radius: 50%;
  -webkit-animation: ${borderScale} 1s infinite ease-in-out;
  animation: ${borderScale} 1s infinite ease-in-out;

  p {
    font-weight: bold;
    font-size: 2em;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -100%);
  }
`;
