import P from '../../Atoms/Paragraph/P.tsx';
import { ChangeEvent, useEffect, useState } from 'react';
import { roles } from '../../../mocks/db.ts';
import { FiltersLabel, StyledFilterMenu } from './FilterMenu.styles.ts';

interface IFilterTypes {
  type: string;
  value: string[];
}

const FilterMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<IFilterTypes[]>([]);

  useEffect(() => {
    console.log(filters);
  }, [filters]);
  const handleOnClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleCheckFilters = (
    e: ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    if (e.target.checked) {
      if (filters.filter((filter) => filter.type === type).length > 0) {
        setFilters(
          filters.map((filter) =>
            filter.type === type
              ? (filter = { type, value: [...filter.value, e.target.id] })
              : filter,
          ),
        );
      } else {
        setFilters([...filters, { type, value: [e.target.id] }]);
      }
    } else {
      setFilters(
        filters.map((filter) =>
          filter.type === type
            ? (filter = {
                type,
                value: filter.value.filter((value) => value !== e.target.id),
              })
            : filter,
        ),
      );
    }
  };

  return (
    <StyledFilterMenu $open={isOpen}>
      <FiltersLabel onClick={handleOnClick}>
        <P weight={'bold'}>Filters</P>
      </FiltersLabel>
      <div>
        <P weight={'bold'}>Role</P>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          {roles.map((role) => (
            <li key={role.id} style={{ padding: '0.5rem 0' }}>
              <input
                type={'checkbox'}
                id={role.type}
                onChange={(e) => handleCheckFilters(e, 'role')}
              />{' '}
              {role.name}
            </li>
          ))}
        </ul>
        <P weight={'bold'}>User status</P>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <li style={{ padding: '0.5rem 0' }}>
            <input
              type={'checkbox'}
              id={'active'}
              onChange={(e) => handleCheckFilters(e, 'blocked')}
            />{' '}
            Active
          </li>
          <li style={{ padding: '0.5rem 0' }}>
            <input type={'checkbox'} id={'blocked'} /> Blocked
          </li>
        </ul>
        <P weight={'bold'}>Confirm status</P>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <li style={{ padding: '0.5rem 0' }}>
            <input
              type={'checkbox'}
              id={'confirmed'}
              onChange={(e) => handleCheckFilters(e, 'confirmed')}
            />{' '}
            Confirmed
          </li>
          <li style={{ padding: '0.5rem 0' }}>
            <input type={'checkbox'} id={'notConfirmed'} /> Not confirmed
          </li>
        </ul>
      </div>
    </StyledFilterMenu>
  );
};

export default FilterMenu;
