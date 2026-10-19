import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  shared: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
  },
  server: {
    // Vercel sets VERCEL_PROJECT_PRODUCTION_URL (without protocol) on deploy
    SITE_URL: z
      .string()
      .url()
      .default(
        process.env.VERCEL_PROJECT_PRODUCTION_URL
          ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
          : 'http://localhost:3000',
      ),
    IGDB_CLIENT_ID: z.string(),
    IGDB_CLIENT_SECRET: z.string(),
  },
  client: {},
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },
});
