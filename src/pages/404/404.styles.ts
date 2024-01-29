import styled from 'styled-components';

export const Styled404 = styled.section`
  padding: 40px 0;
  background: #fff;
  font-family: 'Arvo', serif;

  img {
    width: 100%;
  }
`;

export const Wrapper404 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 3rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  p {
    margin: 0 0 1rem;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
    padding: 1rem 2rem;
    background: ${({ theme }) => theme.colors.blue};
    margin: 2rem 0;
    display: inline-block;
  }
`;

export const Bg404 = styled.div`
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  background-repeat: no-repeat;
  height: 40rem;
  background-position: center;

  h1 {
    font-size: 10rem;
    text-align: center;
  }
`;
