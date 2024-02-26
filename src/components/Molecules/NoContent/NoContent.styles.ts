import styled from 'styled-components';

export const StyledNoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;

  h3 {
    font-size: ${({ theme }) => theme.fontSize.xxl};
    padding: 2rem;
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.lm};
  }

  img {
    height: 30rem;
    margin: 1rem 0 3rem;
  }
`;
