import type { Preview } from "@storybook/react";
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/lib/ui/theme/createTheme';

export const decorators = [
  (Story: React.ComponentType) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];

const preview: Preview = {
  decorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
