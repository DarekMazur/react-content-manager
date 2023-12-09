import type { Preview } from '@storybook/react';

import { ThemeProvider } from 'styled-components';

import { theme } from '../src/utils/themes/theme';
import { GlobalStyle } from '../src/styles/GlobalStyle';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
