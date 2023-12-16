import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  StyledPagination,
  StyledPaginationNumber,
} from './Pagination.styles.ts';

interface PaginationProps {
  pages: number;
  current: number;
  // eslint-disable-next-line no-unused-vars
  handlePageChoose: (id: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  pages,
  current,
  handlePageChoose,
}) => {
  const paginationValues = (pages: number) => {
    const pagesEnums = [];
    for (let i = 1; i <= pages; i++) {
      pagesEnums.push(i);
    }

    return pagesEnums;
  };

  return (
    <StyledPagination>
      <FontAwesomeIcon
        style={{ fontSize: '1.4rem' }}
        icon={['fas', 'chevron-left']}
      />
      {paginationValues(pages).map((number) => (
        <StyledPaginationNumber
          $current={current}
          $number={number}
          onClick={() => handlePageChoose(number)}
        >
          {number}
        </StyledPaginationNumber>
      ))}
      <FontAwesomeIcon
        style={{ fontSize: '1.4rem' }}
        icon={['fas', 'chevron-right']}
      />
    </StyledPagination>
  );
};

export default Pagination;
