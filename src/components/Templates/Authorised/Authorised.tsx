import Header from '../../Organisms/Header/Header.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from '../../../pages/Home/Home.tsx';
import Articles from '../../../pages/Articles/Articles.tsx';
import Article from '../../../pages/Article/Article.tsx';
import UserView from '../../../pages/User/User.tsx';
import Users from '../../../pages/Users/Users.tsx';
import CommentsView from '../../../pages/Comments/Comments.tsx';
import CommentView from '../../../pages/Comment/Comment.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { UserTypes } from '../../../types/dataTypes.ts';
import CategoriesView from '../../../pages/Categories/Categories.tsx';
import CategoryView from '../../../pages/Category/Category.tsx';

const Authorised = () => {
  const user = useSelector<RootState>((state) => state.user);

  return (
    <>
      <Header user={user as UserTypes} />
      <Routes>
        <Route path="/" element={<Home user={user as UserTypes} />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:id" element={<Article />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:uuid" element={<UserView />} />
        <Route path="comments" element={<CommentsView />} />
        <Route path="comments/:uuid" element={<CommentView />} />
        <Route path="categories" element={<CategoriesView />} />
        <Route path="categories/:uuid" element={<CategoryView />} />
      </Routes>
    </>
  );
};

export default Authorised;
