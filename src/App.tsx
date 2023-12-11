import { GlobalStyle } from './styles/GlobalStyle.ts';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/themes/theme.ts';
import FooterWrapper from './components/Organisms/Footer/Footer.tsx';
import Header from './components/Organisms/Header/Header.tsx';
import { adminUser } from './utils/data.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import React, { useEffect, useState } from 'react';
import { getFooterHeight } from './utils/methods/getFooterHeight.ts';

const App = () => {
  const user = {
    userName: adminUser.username,
    avatar: adminUser.avatar,
    uuid: adminUser.uuid,
  };

  const [isAuthorised, setIsAuthorised] = useState(false);
  // const [isAuthorised, setIsAuthorised] = useState(adminUser.role.type === 'admin');

  const [wrapperHeight, setWrapperHeight] = useState(0);

  const handleMockLogin = (e?: React.ChangeEvent<HTMLInputElement>) => {
    e && e.preventDefault();
    setIsAuthorised(true);
  };

  useEffect(() => {
    setWrapperHeight(getFooterHeight());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Header user={user} isAuthorised={isAuthorised} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isAuthorised={isAuthorised}
                handleMockLogin={handleMockLogin}
                wrapperHeight={wrapperHeight}
              />
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
