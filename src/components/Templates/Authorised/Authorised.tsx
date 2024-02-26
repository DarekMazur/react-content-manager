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
import CategoriesView from '../../../pages/Categories/Categories.tsx';
import CategoryView from '../../../pages/Category/Category.tsx';
import Page404 from '../../../pages/404/404.tsx';
import { IStrapiUser } from '../../../types/userTypes.ts';

const Authorised = () => {
  const user = useSelector<RootState>((state) => state.user);

  return (
    <>
      <Header user={user as IStrapiUser} />
      <Routes>
        <Route path="/" element={<Home user={user as IStrapiUser} />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:id" element={<Article />} />
        <Route path="articles/create" element={<Article />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:uuid" element={<UserView />} />
        <Route path="comments" element={<CommentsView />} />
        <Route path="comments/:uuid" element={<CommentView />} />
        <Route path="categories" element={<CategoriesView />} />
        <Route path="categories/:uuid" element={<CategoryView />} />
        <Route path="categories/create" element={<CategoryView />} />
        <Route path="404" element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default Authorised;
