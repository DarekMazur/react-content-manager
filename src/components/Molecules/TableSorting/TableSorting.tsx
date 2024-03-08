import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledTableSorting } from './TableSorting.styles.ts';
import { useDispatch, useSelector } from 'react-redux';
import { createSort, ISortTypes, RootState } from '../../../store';

const TableSorting = ({ sortValue }: { sortValue: string | null }) => {
  const dispatch = useDispatch();
  const sort = useSelector<RootState>((state) => state.sort);
  const handleAscending = () => {
    dispatch(createSort({ sortBy: sortValue, order: 'asc' }));
  };
  const handleDescending = () => {
    dispatch(createSort({ sortBy: sortValue, order: 'desc' }));
  };

  return (
    <StyledTableSorting
      $color={sortValue === (sort as ISortTypes).sortBy}
      $order={(sort as ISortTypes).order}
    >
      <FontAwesomeIcon icon={['fas', 'caret-up']} onClick={handleAscending} />
      <FontAwesomeIcon
        icon={['fas', 'caret-down']}
        onClick={handleDescending}
      />
    </StyledTableSorting>
  );
};

export default TableSorting;
