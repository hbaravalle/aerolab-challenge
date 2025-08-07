import './globals.css';

import { Metadata, Viewport } from 'next/types';
import { Toaster } from 'react-hot-toast';

import { Header } from '@/components/common/Header';
import BackgroundKeys from '@/components/ui/BackgroundKeys';
import { env } from '@/lib/env';
import { cn } from '@/utils/cn';

import { fontVariables } from './fonts';

export const metadata: Metadata = {
  alternates: {
    canonical: env.SITE_URL,
  },
  title: {
    default: 'Gaming Haven Z',
    template: '%s | Gaming Haven Z',
  },
  description: 'Discover and collect your favorite games.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon0.svg', type: 'image/svg+xml' },
      { url: '/icon1.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Gaming Haven Z',
    description: 'Discover and collect your favorite games.',
    type: 'website',
    locale: 'en_US',
    url: env.SITE_URL,
    siteName: 'Gaming Haven Z',
  },
  twitter: {
    creator: '@hbaravalle',
    site: '@gaminghavenZ',
    card: 'summary_large_image',
    title: 'Gaming Haven Z',
    description: 'Discover and collect your favorite games.',
  },
};

export const viewport: Viewport = {
  themeColor: '#6727a6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(...fontVariables)}>
      <body className="font-sans antialiased">
        <BackgroundKeys />
        <div className="mx-auto max-w-3xl px-4 pt-8">
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
