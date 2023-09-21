import { env } from './src/lib/env.mjs';

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: env.SITE_URL,
  generateRobotsTxt: true,
};

export default config;
