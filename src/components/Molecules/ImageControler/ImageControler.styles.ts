import styled from 'styled-components';

export const StyledImageControler = styled.div<{ $isRounded?: boolean }>`
  border-radius: ${({ $isRounded }) => ($isRounded ? '50%' : 'unset')};
  overflow: hidden;
  width: 25rem;
  height: ${({ $isRounded }) => ($isRounded ? '25rem' : 'unset')};

  img {
    width: 25rem;
  }
`;
