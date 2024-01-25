import styled from 'styled-components';

export const StyledCommentForm = styled.form`
  max-width: 80vw;
  margin: auto;
`;

export const CommentFormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4rem;
`;

export const CommentDetails = styled.div`
  max-width: 70%;
`;

export const CommentDetailList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    padding: 1rem 0;
  }
`;

export const CommentStatus = styled.span<{
  $isRed?: boolean;
  $isYellow?: boolean;
}>`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme, $isRed, $isYellow }) =>
    $isRed
      ? theme.colors.red
      : $isYellow
        ? theme.colors.yellow
        : theme.colors.green};
`;

export const CommentContent = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  padding: 1rem 1.5rem;
  margin: 2rem 1rem;
  border-radius: 1rem;

  svg {
    position: absolute;
    top: 0.2rem;
    left: 0.5rem;
    font-size: 3.7rem;
    opacity: 0.2;

    &:last-of-type {
      top: unset;
      left: unset;
      bottom: 0.2rem;
      right: 0.5rem;
    }
  }
`;
