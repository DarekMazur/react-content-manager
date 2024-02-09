import P from '../../Atoms/Paragraph/P.tsx';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { FiltersLabel, StyledFilterMenu } from './FilterMenu.styles.ts';
import { clearFilters, modifyFilter, RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  IFilterElementsTypes,
  IFilterTypes,
} from '../../../types/dataTypes.ts';
import { FormButton } from '../Forms/UserForm/UserForm.styles.ts';
import { useTranslation } from 'react-i18next';

interface IFilterMenuTypes {
  menuItems: IFilterElementsTypes[];
}

const FilterMenu: FC<IFilterMenuTypes> = ({ menuItems }) => {
  const { t } = useTranslation();
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
        <P weight={'bold'}>{t('filters.filters')}</P>
      </FiltersLabel>
      <form>
        {menuItems.map((menuItem) => (
          <React.Fragment key={menuItem.label}>
            <P weight={'bold'}>{menuItem.label}</P>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              {menuItem.elements.map((element) => (
                <li key={element.id} style={{ padding: '0.5rem 0' }}>
                  <input
                    type={'checkbox'}
                    id={element.id}
                    onChange={(e) => handleCheckFilters(e, menuItem.type)}
                  />{' '}
                  {element.label}
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
        <FormButton $type="submit" type="reset" onClick={handleClear}>
          {t('filters.users.clear')}
        </FormButton>
      </form>
    </StyledFilterMenu>
  );
};

export default FilterMenu;
