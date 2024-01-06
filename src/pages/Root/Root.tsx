import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setUser } from '../../store/index.ts';
import Authorised from '../../components/Templates/Authorised/Authorised.tsx';
import Unauthorised from '../../components/Templates/Unauthorised/Unauthorised.tsx';
import FooterWrapper from '../../components/Organisms/Footer/Footer.tsx';
import { UserTypes } from '../../__mock__/mockUsers.ts';
import { db } from '../../mocks/db.ts';

const Root = () => {
  const dispatch = useDispatch();
  const user = useSelector<RootState>((state) => state.user);

  const loggedUser = (user as UserTypes).role;

  const [isAuthorised, setIsAuthorised] = useState(
    loggedUser?.id === 1 || loggedUser?.id === 2,
  );
  const handleMockLogin = (e?: React.ChangeEvent<HTMLInputElement>) => {
    e && e.preventDefault();
    const admin = db.user.findFirst({
      where: {
        role: {
          id: {
            equals: 1 || 2,
          },
        },
      },
    });

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
