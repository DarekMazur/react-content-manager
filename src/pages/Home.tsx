import { FC } from 'react';
import Unauthorised from '../components/Templates/Unauthorised/Unauthorised.tsx';

interface HomeProps {
  isAuthorised: boolean;
  handleMockLogin: () => void;
  wrapperHeight: number;
}

const Home: FC<HomeProps> = ({
  isAuthorised,
  handleMockLogin,
  wrapperHeight,
}) => {
  return isAuthorised ? (
    <div>
      <p>Dashboard - authorised</p>
    </div>
  ) : (
    <Unauthorised
      handleMockLogin={handleMockLogin}
      wrapperHeight={wrapperHeight}
    />
  );
};

export default Home;
