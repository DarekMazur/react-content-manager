import { GlobalStyle } from './styles/GlobalStyle.ts';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/themes/theme.ts';
import FooterWrapper from './components/Footer/Footer.tsx';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <p>Clear project</p>
      </div>
      <FooterWrapper />
    </ThemeProvider>
  );
};

export default App;
