import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setUser, useGetUsersQuery } from '../../store/index.ts';
import Authorised from '../../components/Templates/Authorised/Authorised.tsx';
import Unauthorised from '../../components/Templates/Unauthorised/Unauthorised.tsx';
import FooterWrapper from '../../components/Organisms/Footer/Footer.tsx';
import { UserTypes } from '../../types/dataTypes.ts';

const Root = () => {
  const dispatch = useDispatch();
  const user = useSelector<RootState>((state) => state.user);
  const loggedUser = (user as UserTypes).role;
  const { data: users = [] } = useGetUsersQuery();

  const [isAuthorised, setIsAuthorised] = useState(
    loggedUser?.id === 1 || loggedUser?.id === 2,
  );

  const handleMockLogin = (e?: React.ChangeEvent<HTMLInputElement>) => {
    e && e.preventDefault();
    const admin = users.find(
      (user) => user.role.id === 1 || user.role.id === 2,
    );

    if (admin) {
      dispatch(setUser(admin));
      setIsAuthorised(true);
    } else alert("You're not authorised");
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
