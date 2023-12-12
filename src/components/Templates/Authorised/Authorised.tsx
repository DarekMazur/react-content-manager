import Header from '../../Organisms/Header/Header.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from '../../../pages/Home.tsx';
import { mockUsers } from '../../../__mock__/mockUsers.ts';

const Authorised = () => {
  const getUser = () => {
    const admins = mockUsers.filter((user) => user.role.id === 1);
    const getRandomIndex = Math.floor(Math.random() * admins.length);

    return admins[getRandomIndex];
  };
  const user = {
    userName: getUser().username,
    avatar: getUser().avatar,
    uuid: getUser().uuid,
  };

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="articles"
          element={
            <div>
              <p>Articles</p>
            </div>
          }
        />
        <Route
          path="comments"
          element={
            <div>
              <p>Comments</p>
            </div>
          }
        />
        <Route
          path="users"
          element={
            <div>
              <p>Users</p>
            </div>
          }
        />
        <Route
          path="user"
          element={
            <div>
              <p>Single user</p>
            </div>
          }
        />
        <Route
          path="gallery"
          element={
            <div>
              <p>Gallery</p>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default Authorised;
