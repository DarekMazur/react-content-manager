import styled from 'styled-components';

export const StyledIcon = styled.div`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blue};
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  margin-right: 2rem;

  img {
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    object-position: center 0.2rem;
  }

  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.lightBlue};
  }
`;
