
"use client";

import type { PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
// Imports from @xellar/kit
import { XellarKitProvider, darkTheme } from '@xellar/kit'; // Assuming darkTheme is correctly exported
import { XellarAuthProvider } from '@/contexts/XellarContext';
import { wagmiConfig, queryClient } from '@/lib/xellarConfig';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider> {/* Removed theme={darkTheme} for diagnostics */}
          <XellarAuthProvider>
            {children}
          </XellarAuthProvider>
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
