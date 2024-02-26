import styled from 'styled-components';

export const StyledNoContent = styled.div`
  min-height: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;

  h3 {
    font-size: ${({ theme }) => theme.fontSize.xxl};
    padding: 2rem;
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.lm};
  }

  img {
    height: 20rem;
  }
`;
