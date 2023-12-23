import { theme } from '../themes/theme.ts';
import { GlobalStyle } from '../../styles/GlobalStyle.ts';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Confirm from '../../components/Organisms/Confirm/Confirm.tsx';

interface ProvidersProps {
  children: ReactNode;
}
const AppProviders: FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalStyle />
          <Confirm />
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default AppProviders;
