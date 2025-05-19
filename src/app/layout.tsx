
            import type { Metadata, Viewport } from 'next'; // Assuming Viewport might be used elsewhere
            import './globals.css';
            import { Header } from '@/components/layout/Header';
            import { Footer } from '@/components/layout/Footer';
            import { Toaster } from "@/components/ui/toaster";
            import { AppProviders } from '@/components/AppProviders';

            // Replace with your actual Xellar verification meta tag details if provided
            const xellarVerificationMeta = {
              name: "xellar-verification", // Example name
              content: "YOUR_XELLAR_VERIFICATION_TOKEN_HERE", // Example content
            };

            export const metadata: Metadata = {
              title: 'CryptoIndexFund - Decentralized Crypto Fund',
              description: 'Invest in crypto with transparency and decentralization. Welcome to CryptoIndexFund.',
              // If Xellar provides a meta tag, add it here
              other: {
                // Spread the verification meta if it's valid
                ...(xellarVerificationMeta.name && xellarVerificationMeta.content ? { [xellarVerificationMeta.name]: xellarVerificationMeta.content } : {}),
              },
              icons: {
                icon: '/favicon.ico',
                other: [ // For android-chrome-192x192.png etc.
                  { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' }, // Example
                  { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
                  { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
                ],
              },
            };

            export const viewport: Viewport = {
              themeColor: '#191970', // Example theme color, sync with your actual theme
            };

            export default function RootLayout({
              children,
            }: Readonly<{
              children: React.ReactNode;
            }>) {
              return (
                <html lang="en" className="dark">
                  <body className={`antialiased flex flex-col min-h-screen bg-background text-foreground`}>
                    <AppProviders>
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
            