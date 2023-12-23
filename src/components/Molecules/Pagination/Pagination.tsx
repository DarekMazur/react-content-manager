import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  StyledPagination,
  StyledPaginationNumber,
} from './Pagination.styles.ts';
import { theme } from '../../../utils/themes/theme.ts';

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
        style={{
          fontSize: '1.4rem',
          color: current === 1 ? theme.colors.darkBlueTransparent : 'inherit',
          cursor: current === 1 ? 'auto' : 'pointer',
        }}
        icon={['fas', 'chevron-left']}
        onClick={current !== 1 ? () => handlePageChoose(current - 1) : () => {}}
      />
      {paginationValues(pages).map((number) => (
        <StyledPaginationNumber
          key={number}
          $current={current}
          $number={number}
          onClick={() => handlePageChoose(number)}
        >
          {number}
        </StyledPaginationNumber>
      ))}
      <FontAwesomeIcon
        style={{
          fontSize: '1.4rem',
          color:
            current === pages ? theme.colors.darkBlueTransparent : 'inherit',
          cursor: current === pages ? 'auto' : 'pointer',
        }}
        icon={['fas', 'chevron-right']}
        onClick={
          current !== pages ? () => handlePageChoose(current + 1) : () => {}
        }
      />
    </StyledPagination>
  );
};

export default Pagination;
