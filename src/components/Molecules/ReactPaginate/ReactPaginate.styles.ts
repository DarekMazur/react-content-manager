import styled from 'styled-components';

export const StyledReactPaginate = styled.div`
  .pagination {
    margin: 0;
    padding: 0;
    list-style-type: none;
    min-width: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .page-nav {
    font-size: 1.4rem;
    color: inherit;
    cursor: pointer;
  }

  .page-item,
  .page-link {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.3rem;
    border-radius: 0.3rem;
    height: 3rem;
    width: 3rem;
    padding: 0 0.5rem;
    font-weight: inherit;
    color: inherit;
    cursor: pointer;
  }

  .page-item {
    transition: 200ms background-color ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.colors.lightBlue};
    }
  }

  .active {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.red};
    cursor: 'auto';

    &:hover {
      background-color: unset;
    }
  }

  .disabled {
    color: ${({ theme }) => theme.colors.darkBlueTransparent};
    cursor: auto;
  }
`;
