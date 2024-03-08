import styled, { keyframes } from 'styled-components';

const grow = keyframes` 
  from {
    transform: scale(0, 0);
    opacity: 0;
  }
  to {
    transform: scale(1, 1);
    opacity: 1;
  }
`;

const move = keyframes` 
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(45px);
  }
 `;

export const UploadingWrapper = styled.div`
  width: 25rem;
  height: 25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem 2rem;
  margin: 0;
  grid-column: span 2;
`;

export const StyledUploader = styled.div`
  height: 20px;
  width: 105px;
  display: flex;
  position: relative;
`;

export const UploaderElement = styled.span`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  animation: ${move} 550ms linear 0ms infinite;
  margin-right: 30px;

  &:first-child {
    position: absolute;
    top: 0;
    left: 0;
    animation: ${grow} 550ms linear 0ms infinite;
  }

  &:last-child {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 0;
    animation: ${grow} 550ms linear 0s infinite reverse;
  }
`;
