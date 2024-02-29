import styled from 'styled-components';

export const StyledArticleForm = styled.form`
  display: flex;
  flex-direction: row-reverse;
  gap: 2rem;
  padding: 2rem;

  aside {
    width: 20vw;
    max-width: 20vw;

    p {
      margin: 0;
      padding: 1.5rem 0;
    }
  }

  .ck-content {
    min-height: 40rem;
  }
`;
