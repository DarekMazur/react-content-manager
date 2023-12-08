import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { theme } from '../themes/theme.ts';
import { GlobalStyle } from '../../styles/GlobalStyle.ts';
import { JSX, PropsWithChildren } from 'react';

export const renderWithProvider = (
  children: PropsWithChildren<JSX.Element>,
) => {
  return render(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>,
  );
};
