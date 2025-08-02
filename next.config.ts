import './src/lib/env';

import { NextConfig } from 'next/types';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn'],
    },
    // removeConsole: false, // Debug
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.igdb.com',
        pathname: '/igdb/image/upload/**',
      },
    ],
  },
};

export default nextConfig;
