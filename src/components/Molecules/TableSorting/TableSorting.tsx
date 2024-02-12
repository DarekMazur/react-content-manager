import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledTableSorting } from './TableSorting.styles.ts';

const TableSorting = () => {
  return (
    <StyledTableSorting>
      <FontAwesomeIcon icon={['fas', 'caret-up']} />
      <FontAwesomeIcon icon={['fas', 'caret-down']} />
    </StyledTableSorting>
  );
};

export default TableSorting;
