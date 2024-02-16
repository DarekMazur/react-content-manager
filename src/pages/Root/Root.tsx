import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setUser, useGetUsersQuery } from '../../store';
import Authorised from '../../components/Templates/Authorised/Authorised.tsx';
import Unauthorised from '../../components/Templates/Unauthorised/Unauthorised.tsx';
import FooterWrapper from '../../components/Organisms/Footer/Footer.tsx';
import { Loading } from '../../components/Atoms/Loading/Loading.styles.ts';
import { IUserData } from '../../types/userTypes.ts';

interface ILoggedUser extends IUserData {
  isAuthorised: boolean;
}

const Root = () => {
  const dispatch = useDispatch();
  const user = useSelector<RootState>((state) => state.user);
  const { data: users = [], isLoading } = useGetUsersQuery();

  useEffect(() => {
    if (localStorage.getItem('username') && localStorage.getItem('id')) {
      const authorised = users.find(
        (user) => user.uuid === localStorage.getItem('id'),
      );

      if (authorised) {
        if (!authorised.confirmed) {
          alert(
            'You are not confirmed. Please check your email and follow instructions.',
          );
        }

        if (authorised.blocked) {
          alert('Your account is blocked. Please contact administration.');
        }
        dispatch(setUser({ ...authorised, isAuthorised: true }));
      }
    }
  }, [dispatch, users]);

  const handleMockLogin = (e?: ChangeEvent<HTMLInputElement>) => {
    e && e.preventDefault();
    const authorised = users.find(
      (user) => user.role.id === 1 && user.confirmed && !user.blocked,
    );

    if (authorised) {
      dispatch(setUser({ ...authorised, isAuthorised: true }));
      localStorage.setItem('username', authorised.username);
      localStorage.setItem('id', authorised.uuid);
    } else alert("You're not authorised");
  };

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <>
      {(user as ILoggedUser).isAuthorised ? (
        <Authorised />
      ) : (
        <Unauthorised handleMockLogin={handleMockLogin} />
      )}
      <FooterWrapper />
    </>
  );
};

export default Root;
