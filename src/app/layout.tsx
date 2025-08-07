import './globals.css';

import { Metadata, Viewport } from 'next/types';
import { Toaster } from 'react-hot-toast';

import { Header } from '@/components/common/Header';
import { env } from '@/lib/env';
import { cn } from '@/utils/cn';

import { fontVariables } from './fonts';

export const metadata: Metadata = {
  alternates: {
    canonical: env.SITE_URL,
  },
  title: {
    default: 'Aerolab Next.js Starter',
    template: '%s | Aerolab Next.js Starter',
  },
  openGraph: {
    title: 'Aerolab Next.js Starter',
    description: 'Next.js starter template by Aerolab',
    type: 'website',
    locale: 'en_US',
    url: env.SITE_URL,
    siteName: 'Aerolab Next.js Starter',
  },
  twitter: {
    creator: '@aerolab',
    site: '@aerolab',
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(...fontVariables)}>
      <body className="font-sans antialiased">
        <div className="mx-auto max-w-3xl px-4 pt-8 md:pt-32">
          <Header />
          <main>{children}</main>
        </div>
        <Toaster
          position="bottom-center"
          reverseOrder={true}
          containerStyle={{ bottom: '26px' }}
        />
      </body>
    </html>
  );
}
