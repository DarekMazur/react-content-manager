import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledPagination } from './Pagination.styles.ts';

interface PaginationProps {
  pages: number;
}

const Pagination: FC<PaginationProps> = ({ pages }) => {
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
        <span key={number}>{number}</span>
      ))}
      <FontAwesomeIcon
        style={{ fontSize: '1.4rem' }}
        icon={['fas', 'chevron-right']}
      />
    </StyledPagination>
  );
};

export default Pagination;
