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
import { Auth0Provider } from '@auth0/auth0-react';

interface IProvidersProps {
  children: ReactNode;
}
const AppProviders: FC<IProvidersProps> = ({ children }) => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
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
    </Auth0Provider>
  );
};

export default AppProviders;
