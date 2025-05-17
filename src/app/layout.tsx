
import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { AppProviders } from '@/components/AppProviders'; // Import AppProviders

export const metadata: Metadata = {
  title: 'TrustVest - Decentralized Crypto Fund',
  description: 'Invest in crypto with transparency and decentralization. Welcome to TrustVest.',
  // By providing an explicit (even if minimal or empty) icons object,
  // we can often override Next.js's default behavior of looking for /app/favicon.ico
  // If you have a specific favicon you want to use, you would configure it here.
  // For now, this helps prevent an unwanted default.
  icons: {
    // icon: '/path/to/your/new-favicon.ico', // Example if you had one
    // shortcut: '/path/to/your/new-favicon.png', // Example
    // apple: '/path/to/your/apple-touch-icon.png', // Example
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`antialiased flex flex-col min-h-screen bg-background text-foreground`}>
        <AppProviders> {/* Wrap with AppProviders */}
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
