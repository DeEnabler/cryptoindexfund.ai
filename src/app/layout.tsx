
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
// import { AppProviders } from '@/components/AppProviders'; // Replaced by ContextProvider
import { headers } from "next/headers";
import ContextProvider from '../../context'; // Updated import path

export const metadata: Metadata = {
  title: 'CryptoIndexFund - Decentralized Crypto Fund',
  description: 'Invest in crypto with transparency and decentralization. Welcome to CryptoIndexFund.',
  icons: {
    icon: '/favicon.ico',
    other: [
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A23', // Adjusted to a dark navy/purple base
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = headers().get('cookie');

  return (
    <html lang="en" className="dark">
      <body className={`antialiased flex flex-col min-h-screen bg-background text-foreground`}>
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
