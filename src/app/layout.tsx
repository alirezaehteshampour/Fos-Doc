import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { AIChat } from '@/components/ai-chat';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
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
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FOS Documentation',
    description: 'Official documentation for FOS blockchain platform',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
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
