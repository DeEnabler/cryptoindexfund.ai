
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import ContextProvider from '../../context'; // Path relative to project root
import { headers } from "next/headers";

const fkGrotesk = localFont({
  src: [
    {
      path: '@/app/fonts/FKGrotesk-Regular.woff2', // Expects src/app/fonts/FKGrotesk-Regular.woff2
      weight: '400',
      style: 'normal',
    },
    {
      path: '@/app/fonts/FKGrotesk-Medium.woff2', // Expects src/app/fonts/FKGrotesk-Medium.woff2
      weight: '500',
      style: 'normal',
    },
    {
      path: '@/app/fonts/FKGrotesk-Bold.woff2',   // Expects src/app/fonts/FKGrotesk-Bold.woff2
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-fk-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CryptoIndexFund - Decentralized Crypto Fund',
  description: 'Invest in crypto with transparency and decentralization. Welcome to CryptoIndexFund.',
  icons: {
    icon: '/favicon.ico', // Path relative to the public directory
    other: [
       { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
       { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#191970', // Corresponds to --background: 240 64% 2.5% (Dark Navy)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = headers().get('cookie');

  return (
    <html lang="en" className={`${fkGrotesk.variable} dark`}>
      <body className={`antialiased flex flex-col min-h-screen bg-background text-foreground font-sans`}>
        <ContextProvider cookies={cookies}>
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ContextProvider>
      </body>
    </html>
  );
}
