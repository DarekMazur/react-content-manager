import styled from 'styled-components';

export const StyledButton = styled.button`
  margin: 1rem;
  width: 25rem;
  height: 4rem;
  border-radius: 1.2rem;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.lm};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
  box-shadow: ${({ theme }) => `0.1rem 0.1rem 0.3rem ${theme.colors.darkBlue}`};

  &:hover {
    color: ${({ theme }) => theme.colors.lightBlue};
  }

  &:active {
    box-shadow: unset;
  }
`;
