import '../src/styles/globals.css';

import type { Preview } from '@storybook/react';
import { Inter } from 'next/font/google';

import { withThemeByClassName } from '@storybook/addon-styling';

const inter = Inter({
  subsets: ['latin'],
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    // Adds theme switching support.
    // NOTE: requires setting "darkMode" to "class" in your tailwind config
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story) => (
      <div className={`${inter.className}`}>
        <Story />
      </div>
    )
  ],
};

export default preview;
