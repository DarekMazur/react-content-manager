import Header from '../../Organisms/Header/Header.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from '../../../pages/Home/Home.tsx';
import Articles from '../../../pages/Articles/Articles.tsx';
import Article from '../../../pages/Article/Article.tsx';
import UserView from '../../../pages/User/User.tsx';
import Users from '../../../pages/Users/Users.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index.ts';
import { UserTypes } from '../../../types/dataTypes.ts';

const Authorised = () => {
  const user = useSelector<RootState>((state) => state.user);

  return (
    <>
      <Header user={user as UserTypes} />
      <Routes>
        <Route path="/" element={<Home user={user as UserTypes} />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:id" element={<Article />} />
        <Route
          path="comments"
          element={
            <div>
              <p>Comments</p>
            </div>
          }
        />
        <Route path="users" element={<Users />} />
        <Route path="users/:uuid" element={<UserView />} />
      </Routes>
    </>
  );
};

export default Authorised;
