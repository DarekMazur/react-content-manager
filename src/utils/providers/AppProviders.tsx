import { theme } from '../themes/theme.ts';
import { GlobalStyle } from '../../styles/GlobalStyle.ts';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Confirm from '../../components/Organisms/Confirm/Confirm.tsx';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

interface IProvidersProps {
  children: ReactNode;
}
const AppProviders: FC<IProvidersProps> = ({ children }) => {
  return (
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <GlobalStyle />
            <Confirm />
            {children}
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </I18nextProvider>
  );
};

export default AppProviders;
