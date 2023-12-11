import styled from 'styled-components';

interface StyleProps {
  $height: number;
}

export const StyledUnauthorised = styled.main<StyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  min-height: ${({ $height }) => `calc(100vh - ${$height}px)`};
`;
