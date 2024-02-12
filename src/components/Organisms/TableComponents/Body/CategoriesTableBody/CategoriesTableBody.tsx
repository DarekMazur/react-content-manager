import {
  IArticleDataTypes,
  ICategoriesTypes,
} from '../../../../../types/dataTypes.ts';
import Checkbox from '../../../../Molecules/Checkbox/Checkbox.tsx';
import TableActionIcons from '../../../../Molecules/TableActionIcons/TableActionIcons.tsx';
import {
  addCategorySelected,
  removeCategorySelected,
  RootState,
} from '../../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const CategoriesTableBody = ({ data }: { data: ICategoriesTypes[] }) => {
  const dispatch = useDispatch();
  const selectedCategories = useSelector<RootState>(
    (state) => state.selectedCategories,
  );

  const [checkedCategories, setCheckedCategories] = useState<
    ICategoriesTypes[]
  >(selectedCategories as ICategoriesTypes[]);
  const handleClickSelect = (uuid: string) => {
    const checkedElement = data.find((category) => category.uuid === uuid);
    if (
      checkedElement &&
      checkedCategories.includes(checkedElement as IArticleDataTypes)
    ) {
      dispatch(removeCategorySelected(checkedElement));
      setCheckedCategories(
        checkedCategories.filter((article) => article.uuid !== uuid),
      );
    } else if (checkedElement) {
      dispatch(addCategorySelected(checkedElement));
      setCheckedCategories((prevState) => [
        ...prevState,
        checkedElement as IArticleDataTypes,
      ]);
    }
  };

  return (
    <>
      {data.map((category) => (
        <tr key={category.uuid}>
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
              uuid={category.uuid}
              isChecked={Array.from(
                checkedCategories as ICategoriesTypes[],
              ).includes(category)}
            />
          </td>
          <td>{category.id}</td>
          <td style={{ textAlign: 'left' }}>{category.title}</td>
          <td style={{ textAlign: 'left' }}>{category.description}</td>
          <td style={{ textAlign: 'left' }}>
            <TableActionIcons id={category.id} uuid={category.uuid} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default CategoriesTableBody;
