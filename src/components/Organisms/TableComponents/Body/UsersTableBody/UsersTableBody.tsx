import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  addUserSelected,
  removeUserSelected,
  useUpdateUserMutation,
} from '../../../../../store';
import Checkbox from '../../../../Molecules/Checkbox/Checkbox';
import TableActionIcons from '../../../../Molecules/TableActionIcons/TableActionIcons';
import { useEffect, useState } from 'react';
import { IStrapiUser } from '../../../../../types/userTypes.ts';

const UsersTableBody = ({ data }: { data: IStrapiUser[] }) => {
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const currentUser = useSelector<RootState>((state) => state.user);
  const selectedUsers = useSelector<RootState>((state) => state.selectedUsers);

  const [checkedUsers, setCheckedUsers] = useState<IStrapiUser[]>(
    selectedUsers as IStrapiUser[],
  );

  useEffect(() => {
    setCheckedUsers(selectedUsers as IStrapiUser[]);
  }, [selectedUsers]);

  const handleClickSelect = (
    uuid: string,
    _type: string | undefined,
    isDisabled: boolean | undefined,
  ) => {
    if (!isDisabled) {
      const checkedElement = data.find((user) => user.uuid === uuid);
      if (
        checkedElement &&
        checkedUsers.includes(checkedElement as IStrapiUser)
      ) {
        dispatch(removeUserSelected(checkedElement));
        setCheckedUsers(checkedUsers.filter((user) => user.uuid !== uuid));
      } else if (checkedElement) {
        dispatch(addUserSelected(checkedElement));
        setCheckedUsers((prevState) => [
          ...prevState,
          checkedElement as IStrapiUser,
        ]);
      }
    }
  };

  const handleClickSwitch = (uuid: string, type: string | undefined) => {
    const user = data.find((user) => user.uuid === uuid);
    if (user && type) {
      const updatedUser = { ...user };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      updatedUser[type as keyof IStrapiUser] =
        !updatedUser[type as keyof IStrapiUser];
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
              isDisabled={(currentUser as IStrapiUser).uuid === user.uuid}
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
