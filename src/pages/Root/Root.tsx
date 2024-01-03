import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setUser } from '../../store/index.ts';
import Authorised from '../../components/Templates/Authorised/Authorised.tsx';
import Unauthorised from '../../components/Templates/Unauthorised/Unauthorised.tsx';
import FooterWrapper from '../../components/Organisms/Footer/Footer.tsx';
import { UserTypes, mockUsers } from '../../__mock__/mockUsers.ts';
import { faker } from '@faker-js/faker';

const Root = () => {
  const dispatch = useDispatch();
  const user = useSelector<RootState>((state) => state.user);

  const loggedUser = (user as UserTypes).role;

  const [isAuthorised, setIsAuthorised] = useState(
    loggedUser?.id === 1 || loggedUser?.id === 2,
  );
  const handleMockLogin = (e?: React.ChangeEvent<HTMLInputElement>) => {
    e && e.preventDefault();
    const users = mockUsers;
    const getUser = () => {
      const admins = users.filter((user) => user.role.id === 1);
      if (admins.length === 0) {
        return users[0];
      }

      const randomIndex = faker.number.int({ min: 0, max: admins.length - 1 });
      return admins[randomIndex];
    };
    const logUser = getUser();
    dispatch(setUser(logUser));
    setIsAuthorised(true);
  };

  return (
    <>
      {isAuthorised ? (
        <Authorised />
      ) : (
        <Unauthorised handleMockLogin={handleMockLogin} />
      )}
      <FooterWrapper />
    </>
  );
};

export default Root;
