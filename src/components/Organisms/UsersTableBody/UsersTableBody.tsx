import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  addUserSelected,
  removeUserSelected,
  useUpdateUserMutation,
} from '../../../store';
import { UserTypes } from '../../../types/dataTypes';
import Checkbox from '../../Molecules/Checkbox/Checkbox';
import TableActionIcons from '../../Molecules/TableActionIcons/TableActionIcons';
import { useEffect, useState } from 'react';

const UsersTableBody = ({ data }: { data: UserTypes[] }) => {
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();
  
  const currentUser = useSelector<RootState>((state) => state.user);
  const selectedUsers = useSelector<RootState>((state) => state.selectedUsers);

  const [checkedUsers, setCheckedUsers] = useState<UserTypes[]>(
    selectedUsers as UserTypes[],
  );

  useEffect(() => {
    setCheckedUsers(selectedUsers as UserTypes[]);
  }, [selectedUsers]);

  const handleClickSelect = (uuid: string, _type: string | undefined, isDisabled: boolean | undefined) => {
    if (!isDisabled) {
      const checkedElement = data.find((user) => user.uuid === uuid);
      if (checkedElement && checkedUsers.includes(checkedElement as UserTypes)) {
        dispatch(removeUserSelected(checkedElement));
        setCheckedUsers(checkedUsers.filter((user) => user.uuid !== uuid));
      } else if (checkedElement) {
        dispatch(addUserSelected(checkedElement));
        setCheckedUsers((prevState) => [
          ...prevState,
          checkedElement as UserTypes,
        ]);
      }
    }
    
  };

  const handleClickSwitch = (uuid: string, type: string | undefined) => {
    const user = data.find((user) => user.uuid === uuid);
    if (user && type) {
      const updatedUser = { ...user };
      updatedUser[type as keyof UserTypes] =
        !updatedUser[type as keyof UserTypes];
      updateUser({ ...updatedUser });
    }
  };

  return (
    <>
      {data.map((user) => (
        <tr key={user.uuid}>
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
              isDisabled={(currentUser as UserTypes).uuid === user.uuid}
            />
          </td>
          <td>{user.id}</td>
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
