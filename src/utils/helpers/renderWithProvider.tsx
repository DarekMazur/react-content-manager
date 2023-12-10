import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { theme } from '../themes/theme.ts';
import { GlobalStyle } from '../../styles/GlobalStyle.ts';
import { JSX, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const renderWithProvider = (
  children: PropsWithChildren<JSX.Element>,
) => {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        {children}
      </BrowserRouter>
    </ThemeProvider>,
  );
};
