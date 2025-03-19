import './src/lib/env';

import { NextConfig } from 'next/types';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn'],
    },
  },
};

export default nextConfig;
