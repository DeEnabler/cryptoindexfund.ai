
"use client";

import type { PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// Assuming XellarKitProvider and darkTheme are from @xellar/kit
import { XellarKitProvider, darkTheme } from '@xellar/kit';
import { XellarAuthProvider } from '@/contexts/XellarContext'; // Updated import
import { wagmiConfig, queryClient } from '@/lib/xellarConfig'; // Updated import

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider theme={darkTheme}> {/* XellarKitProvider might take config or rely on Wagmi's context. Theme is a guess. */}
          <XellarAuthProvider>
            {children}
          </XellarAuthProvider>
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
