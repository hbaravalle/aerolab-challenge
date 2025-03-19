import { MetadataRoute } from 'next/types';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: '/',
      lastModified: new Date(),
      changeFrequency: 'daily',
    },
  ];
}
