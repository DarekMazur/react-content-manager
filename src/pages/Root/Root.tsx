import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setUser, useGetUsersQuery } from '../../store/index.ts';
import Authorised from '../../components/Templates/Authorised/Authorised.tsx';
import Unauthorised from '../../components/Templates/Unauthorised/Unauthorised.tsx';
import FooterWrapper from '../../components/Organisms/Footer/Footer.tsx';
import { UserTypes } from '../../types/dataTypes.ts';

interface LoggedUser extends UserTypes {
  isAuthorised: boolean;
}

const Root = () => {
  const dispatch = useDispatch();
  const user = useSelector<RootState>((state) => state.user);
  const { data: users = [] } = useGetUsersQuery();

  const handleMockLogin = (e?: ChangeEvent<HTMLInputElement>) => {
    e && e.preventDefault();
    const authorised = users.find((user) => user.role.id !== 4);

    if (authorised) {
      dispatch(setUser({ ...authorised, isAuthorised: true }));
    } else alert("You're not authorised");
  };

  return (
    <>
      {(user as LoggedUser).isAuthorised ? (
        <Authorised />
      ) : (
        <Unauthorised handleMockLogin={handleMockLogin} />
      )}
      <FooterWrapper />
    </>
  );
};

export default Root;
