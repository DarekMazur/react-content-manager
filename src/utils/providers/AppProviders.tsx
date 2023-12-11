import { theme } from '../themes/theme.ts';
import { GlobalStyle } from '../../styles/GlobalStyle.ts';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { FC, ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}
const AppProviders: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        {children}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppProviders;
