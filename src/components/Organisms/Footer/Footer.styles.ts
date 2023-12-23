import styled from 'styled-components';

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0;
  min-height: 10rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.lm};
  font-weight: ${({ theme }) => theme.fontWeight.fat};

  p {
    padding: 0.2rem;
    margin: 0;
  }
`;
