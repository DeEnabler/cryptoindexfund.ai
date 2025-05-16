
"use client";

import type { PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
// Assuming AppKitProvider and darkTheme are from @reown/appkit
import { AppKitProvider, darkTheme } from '@reown/appkit'; 
import { ReownAuthProvider } from '@/contexts/ReownAuthContext'; // Updated import
import { wagmiConfig, queryClient } from '@/lib/reownConfig'; // Updated import

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider theme={darkTheme}> {/* Assuming AppKitProvider and theme prop */}
          <ReownAuthProvider>
            {children}
          </ReownAuthProvider>
        </AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
