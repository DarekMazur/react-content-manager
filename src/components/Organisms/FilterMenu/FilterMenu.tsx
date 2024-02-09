import P from '../../Atoms/Paragraph/P.tsx';
import { ChangeEvent, useEffect, useState } from 'react';
import { roles } from '../../../mocks/db.ts';
import { FiltersLabel, StyledFilterMenu } from './FilterMenu.styles.ts';
import { clearFilters, modifyFilter, RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { IFilterTypes } from '../../../types/dataTypes.ts';
import { FormButton } from '../Forms/UserForm/UserForm.styles.ts';

const FilterMenu = () => {
  const dispatch = useDispatch();
  const filters = useSelector<RootState>((state) => state.filters);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(clearFilters());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleClear = () => {
    dispatch(clearFilters());
  };

  const handleCheckFilters = (
    e: ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    if (e.target.checked) {
      if (
        (filters as IFilterTypes[]).filter((filter) => filter.type === type)
          .length > 0
      ) {
        dispatch(
          modifyFilter(
            (filters as IFilterTypes[]).map((filter) =>
              filter.type === type
                ? (filter = {
                    type,
                    value: [...filter.value, e.target.id],
                  })
                : filter,
            ),
          ),
        );
      } else {
        dispatch(
          modifyFilter([
            ...(filters as IFilterTypes[]),
            { type, value: [e.target.id] },
          ]),
        );
      }
    } else {
      dispatch(
        modifyFilter(
          (filters as IFilterTypes[]).map((filter) =>
            filter.type === type
              ? (filter = {
                  type,
                  value: filter.value.filter((value) => value !== e.target.id),
                })
              : filter,
          ),
        ),
      );
    }
  };

  return (
    <StyledFilterMenu $open={isOpen}>
      <FiltersLabel onClick={handleOnClick}>
        <P weight={'bold'}>Filters</P>
      </FiltersLabel>
      <form>
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
            <input
              type={'checkbox'}
              id={'blocked'}
              onChange={(e) => handleCheckFilters(e, 'blocked')}
            />{' '}
            Blocked
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
            <input
              type={'checkbox'}
              id={'notConfirmed'}
              onChange={(e) => handleCheckFilters(e, 'confirmed')}
            />{' '}
            Not confirmed
          </li>
        </ul>
        <FormButton $type="submit" type="reset" onClick={handleClear}>
          Clear filters
        </FormButton>
      </form>
    </StyledFilterMenu>
  );
};

export default FilterMenu;
