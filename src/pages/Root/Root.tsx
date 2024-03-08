import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setUser, useGetMeQuery } from '../../store';
import Authorised from '../../components/Templates/Authorised/Authorised.tsx';
import Unauthorised from '../../components/Templates/Unauthorised/Unauthorised.tsx';
import FooterWrapper from '../../components/Organisms/Footer/Footer.tsx';
import { Loading } from '../../components/Atoms/Loading/Loading.styles.ts';
import { IStrapiUser } from '../../types/userTypes.ts';
import UnauthorisedView from '../UnauthorisedView/UnauthorisedView.tsx';

const Root = () => {
  const dispatch = useDispatch();

  const user = useSelector<RootState>((state) => state.user);
  const { data: myUser, isLoading } = useGetMeQuery();

  useEffect(() => {
    if (myUser) {
      dispatch(setUser(myUser));
    }
  }, [dispatch, myUser]);

  const handleLogin = (e?: ChangeEvent<HTMLInputElement>) => {
    e && e.preventDefault();

    window.location.replace(
      `${import.meta.env.VITE_BACKEND_URL}/api/connect/auth0`,
    );
  };

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <>
      {Object.keys(user as IStrapiUser).length === 0 ? (
        <Unauthorised handleMockLogin={handleLogin} />
      ) : (user as IStrapiUser).role.type === 'public' ||
        (user as IStrapiUser).role.type === 'authenticated' ? (
        <UnauthorisedView />
      ) : (
        <Authorised />
      )}
      <FooterWrapper />
    </>
  );
};

export default Root;
