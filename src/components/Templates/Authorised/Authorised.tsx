import Header from '../../Organisms/Header/Header.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from '../../../pages/Home.tsx';
import { mockUsers } from '../../../__mock__/mockUsers.ts';
import { faker } from '@faker-js/faker';

const Authorised = () => {
  const users = mockUsers;
  const getUser = () => {
    const admins = users.filter((user) => user.role.id === 1);
    if (admins.length === 0) {
      return users[0];
    }

    const randomIndex = faker.number.int({ min: 0, max: admins.length - 1 });
    return admins[randomIndex];
  };
  const user = getUser();

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
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
