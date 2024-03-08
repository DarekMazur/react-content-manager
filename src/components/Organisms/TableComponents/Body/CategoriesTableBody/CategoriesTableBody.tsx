import Checkbox from '../../../../Molecules/Checkbox/Checkbox.tsx';
import TableActionIcons from '../../../../Molecules/TableActionIcons/TableActionIcons.tsx';
import {
  addCategorySelected,
  removeCategorySelected,
  RootState,
} from '../../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ICategoryData } from '../../../../../types/categoryTypes.ts';

const CategoriesTableBody = ({ data }: { data: ICategoryData[] }) => {
  const dispatch = useDispatch();
  const selectedCategories = useSelector<RootState>(
    (state) => state.selectedCategories,
  );

  const [checkedCategories, setCheckedCategories] = useState<ICategoryData[]>(
    selectedCategories as ICategoryData[],
  );
  const handleClickSelect = (uuid: string) => {
    const checkedElement = data.find(
      (category) => category.attributes.uuid === uuid,
    );
    if (
      checkedElement &&
      checkedCategories.includes(checkedElement as ICategoryData)
    ) {
      dispatch(removeCategorySelected(checkedElement));
      setCheckedCategories(
        checkedCategories.filter((article) => article.attributes.uuid !== uuid),
      );
    } else if (checkedElement) {
      dispatch(addCategorySelected(checkedElement));
      setCheckedCategories((prevState) => [
        ...prevState,
        checkedElement as ICategoryData,
      ]);
    }
  };

  return (
    <>
      {data.map((category) => (
        <tr key={category.attributes.uuid}>
          <td
            style={{
              height: '6rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <Checkbox
              handleClick={handleClickSelect}
              uuid={category.attributes.uuid}
              isChecked={Array.from(
                checkedCategories as ICategoryData[],
              ).includes(category)}
            />
          </td>
          <td>{category.id}</td>
          <td style={{ textAlign: 'left' }}>{category.attributes.title}</td>
          <td style={{ textAlign: 'left' }}>
            {category.attributes.description}
          </td>
          <td style={{ textAlign: 'left' }}>
            <TableActionIcons
              id={category.id}
              uuid={category.attributes.uuid}
            />
          </td>
        </tr>
      ))}
    </>
  );
};

export default CategoriesTableBody;
