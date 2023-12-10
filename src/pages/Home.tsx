import { FC } from 'react';

interface HomeProps {
  isAuthorised: boolean;
}
const Home: FC<HomeProps> = ({ isAuthorised }) => {
  return isAuthorised ? (
    <div>
      <p>Dashboard - authorised</p>
    </div>
  ) : (
    <div>
      <p>Dashboard - unauthorised</p>
    </div>
  );
};

export default Home;
