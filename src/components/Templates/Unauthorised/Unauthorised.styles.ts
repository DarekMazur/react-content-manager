import styled from 'styled-components';

interface IStyleProps {
  $height: number;
}

export const StyledUnauthorised = styled.main<IStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  min-height: ${({ $height }) => `calc(100vh - ${$height}px)`};

  p {
    padding: 1rem 0;
  }
`;
