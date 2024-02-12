import { styled } from 'styled-components';

export const StyledTable = styled.table`
  width: 95vw;
  border-radius: 0.7rem;
  border: ${({ theme }) => `0.1rem solid ${theme.colors.darkBlue}`};
  border-spacing: 0;

  thead {
    tr {
      color: ${({ theme }) => theme.colors.white};
    }

    th {
      height: 4rem;
      font-weight: ${({ theme }) => theme.fontWeight.regular};
      background-color: ${({ theme }) => theme.colors.darkBlue};

      &:first-of-type {
        border-radius: 0.7rem 0 0 0;
      }

      &:last-of-type {
        border-radius: 0 0.7rem 0 0;
      }

      div {
        display: flex;
        align-items: center;
        padding: 0 1.5rem;
      }
    }
  }

  tbody {
    width: 90vw;

    tr {
      position: relative;

      &::after {
        position: absolute;
        content: '';
        left: 1vw;
        width: 93vw;
        border-bottom: ${({ theme }) =>
          `1px solid ${theme.colors.darkBlueTransparent}`};
      }
    }

    td {
      text-align: center;
      padding: 0 1rem;
    }
  }
`;
