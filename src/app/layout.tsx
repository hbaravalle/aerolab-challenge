import './globals.css';

import { Metadata, Viewport } from 'next/types';

import { Analytics } from '@/components/common/analytics';
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
        <Analytics />
        {children}
      </body>
    </html>
  );
}
