import { GlobalStyle } from './styles/GlobalStyle.ts';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/themes/theme.ts';
import FooterWrapper from './components/Organisms/Footer/Footer.tsx';
import Header from './components/Organisms/Header/Header.tsx';
import { adminUser } from './utils/data.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  const user = {
    userName: adminUser.username,
    avatar: adminUser.avatar,
    uuid: adminUser.uuid,
  };

  const isAuthorised = () => {
    return adminUser.role.type === 'admin';
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Header user={user} isAuthorised={isAuthorised()} />
        <Routes>
          <Route
            path="/"
            element={
              isAuthorised() ? (
                <div>
                  <p>Dashboard - authorised</p>
                </div>
              ) : (
                <div>
                  <p>Dashboard - unauthorised</p>
                </div>
              )
            }
          />
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
        <FooterWrapper />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
