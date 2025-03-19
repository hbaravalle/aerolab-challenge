import { MetadataRoute } from 'next/types';

import { env } from '@/lib/env';

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: new URL('sitemap.xml', env.SITE_URL).toString(),
  };
}
