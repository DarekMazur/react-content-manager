import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  addSelected,
  removeSelected,
  useUpdateUserMutation,
} from '../../../store';
import { UserTypes } from '../../../types/dataTypes';
import Checkbox from '../../Molecules/Checkbox/Checkbox';
import TableActionIcons from '../../Molecules/TableActionIcons/TableActionIcons';
import { useEffect, useState } from 'react';

const UsersTableBody = ({ data }: { data: UserTypes[] }) => {
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const selectedUsers = useSelector<RootState>((state) => state.selected);

  const [checkedUsers, setCheckedUsers] = useState<UserTypes[]>(
    selectedUsers as UserTypes[],
  );

  useEffect(() => {
    setCheckedUsers(selectedUsers as UserTypes[]);
  }, [selectedUsers]);

  const handleClickSelect = (uuid: string) => {
    const checkedElement = data.find((user) => user.uuid === uuid);
    if (checkedElement && checkedUsers.includes(checkedElement as UserTypes)) {
      dispatch(removeSelected(checkedElement));
      setCheckedUsers(checkedUsers.filter((user) => user.uuid !== uuid));
    } else if (checkedElement) {
      dispatch(addSelected(checkedElement));
      setCheckedUsers((prevState) => [
        ...prevState,
        checkedElement as UserTypes,
      ]);
    }
  };

  const handleClickSwitch = (uuid: string, type: string | undefined) => {
    const user = data.find((user) => user.uuid === uuid);
    console.log(user && user[type as keyof UserTypes]);
    if (user && type) {
      const updatedUser = { ...user };
      updatedUser[type as keyof UserTypes] =
        !updatedUser[type as keyof UserTypes];
      updateUser({ ...updatedUser });
    }
  };

  return (
    <>
      {console.log(selectedUsers)}
      {data.map((user, index) => (
        <tr key={index + 1}>
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
              uuid={user.uuid}
              handleClick={handleClickSelect}
              isChecked={checkedUsers.includes(user)}
            />
          </td>
          <td>{index + 1}</td>
          <td style={{ textAlign: 'left' }}>{user.username}</td>
          <td style={{ textAlign: 'left' }}>{user.email}</td>
          <td>
            <Checkbox
              isChecked={user.confirmed}
              handleClick={handleClickSwitch}
              uuid={user.uuid}
              type="confirmed"
            />
          </td>
          <td>
            <Checkbox
              isChecked={user.blocked}
              uuid={user.uuid}
              type="blocked"
              handleClick={handleClickSwitch}
            />
          </td>
          <td style={{ textAlign: 'left' }}>{user.role.name}</td>
          <td style={{ textAlign: 'left' }}>
            <TableActionIcons id={user.id} uuid={user.uuid} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default UsersTableBody;
