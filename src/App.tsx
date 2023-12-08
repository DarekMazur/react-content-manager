import { GlobalStyle } from './styles/GlobalStyle.ts';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/themes/theme.ts';
import FooterWrapper from './components/Organisms/Footer/Footer.tsx';
import Header from './components/Organisms/Header/Header.tsx';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header isAuthorised={true} />
      <div>
        <p>Clear project</p>
      </div>
      <FooterWrapper />
    </ThemeProvider>
  );
};

export default App;
