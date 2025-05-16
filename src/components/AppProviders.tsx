
"use client";

import type { PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
// Assuming XellarKitProvider is from @xellar/kit
import { XellarKitProvider } from '@xellar/kit'; // Removed darkTheme import for now
import { XellarAuthProvider } from '@/contexts/XellarContext';
import { wagmiConfig, queryClient } from '@/lib/xellarConfig';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {/* Removed theme prop from XellarKitProvider for troubleshooting */}
        <XellarKitProvider>
          <XellarAuthProvider>
            {children}
          </XellarAuthProvider>
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
