
"use client";

import type { PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Import XellarKitProvider and darkTheme from @xellar/kit
import { XellarKitProvider, darkTheme } from '@xellar/kit'; 
import { XellarAuthProvider } from '@/contexts/XellarContext';
import { wagmiConfig, queryClient } from '@/lib/xellarConfig';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider theme={darkTheme}> {/* Apply theme to XellarKitProvider */}
          <XellarAuthProvider>
            {children}
          </XellarAuthProvider>
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
