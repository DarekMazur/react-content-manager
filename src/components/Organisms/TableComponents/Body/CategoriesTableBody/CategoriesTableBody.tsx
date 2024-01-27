import { CategoriesTypes } from '../../../../../types/dataTypes.ts';
import Checkbox from '../../../../Molecules/Checkbox/Checkbox.tsx';
import TableActionIcons from '../../../../Molecules/TableActionIcons/TableActionIcons.tsx';

const CategoriesTableBody = ({ data }: { data: CategoriesTypes[] }) => {
  const handleClickSelect = () => {};

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
              isChecked={false}
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
