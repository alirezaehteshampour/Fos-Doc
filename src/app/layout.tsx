import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { AIChat } from '@/components/ai-chat';
import { withBasePath } from '../../site.config.mjs';

const inter = localFont({
  src: '../../public/fonts/Inter-Variable.ttf',
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fos.ooo'),
  title: {
    template: '%s | FOS Documentation',
    default: 'FOS Documentation - Blockchain Platform',
  },
  description: 'Official documentation for FOS blockchain platform. Explore our whitepaper, smart contracts, API reference, and developer guides.',
  keywords: ['blockchain', 'smart contracts', 'NFT', 'whitepaper', 'crypto', 'DeFi', 'web3'],
  authors: [{ name: 'FOS Team' }],
  creator: 'FOS',
  publisher: 'FOS',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'FOS Documentation',
    title: 'FOS Documentation - Blockchain Platform',
    description: 'Official documentation for FOS blockchain platform',
    images: [withBasePath('/logo.png')],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FOS Documentation',
    description: 'Official documentation for FOS blockchain platform',
    images: [withBasePath('/logo.png')],
  },
  icons: {
    icon: withBasePath('/favicon.png'),
    shortcut: withBasePath('/favicon.png'),
    apple: withBasePath('/favicon.png'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen antialiased" suppressHydrationWarning>
        <RootProvider
          search={{
            options: {
              type: 'static',
              api: withBasePath('/api/search'),
            },
          }}
        >
          {children}
          <AIChat />
        </RootProvider>
      </body>
    </html>
  );
}
