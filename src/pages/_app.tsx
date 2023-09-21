import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

import { Analytics } from '@/components/common';
import seoConfig from '@/config/seo.config';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...seoConfig} />
      <Analytics />
      <Component {...pageProps} />
    </>
  );
}
