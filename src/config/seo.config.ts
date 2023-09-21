import { DefaultSeoProps } from 'next-seo';

export default {
  title: 'Aerolab Next.js Starter',
  description: 'A Next.js starter for Aerolab',
  themeColor: '#000000',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://next-starter-develop.aerolab.dev/',
    siteName: 'Aerolab Next.js Starter',
  },
  twitter: {
    handle: '@aerolab',
    site: '@aerolab',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.png',
      type: 'image/png',
    },
  ],
} as DefaultSeoProps;
