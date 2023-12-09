import { GlobalStyle } from './styles/GlobalStyle.ts';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/themes/theme.ts';
import FooterWrapper from './components/Organisms/Footer/Footer.tsx';
import Header from './components/Organisms/Header/Header.tsx';
import { adminUser } from './utils/data.ts';

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
      <GlobalStyle />
      <Header user={user} isAuthorised={isAuthorised()} />
      <div>
        <p>Clear project</p>
      </div>
      <FooterWrapper />
    </ThemeProvider>
  );
};

export default App;
