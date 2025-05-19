
"use client";

import type { PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Import XellarKitProvider from @xellar/kit conditionally
import { XellarKitProvider, darkTheme } from '@xellar/kit'; 
import { XellarAuthProvider } from '@/contexts/XellarContext';
import { wagmiConfig, queryClient } from '@/lib/xellarConfig';

const disableXellarInDev = process.env.NEXT_PUBLIC_DISABLE_XELLAR_IN_DEV === 'true';

export function AppProviders({ children }: PropsWithChildren) {
  if (disableXellarInDev) {
    console.log("[AppProviders] XellarKitProvider is DISABLED for this environment.");
    return (
      <WagmiProvider config={wagmiConfig}> {/* Still need WagmiProvider with basic config */}
        <QueryClientProvider client={queryClient}>
          <XellarAuthProvider> {/* This will provide mocked context */}
            {children}
          </XellarAuthProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }

  console.log("[AppProviders] XellarKitProvider is ENABLED for this environment.");
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider> {/* Removed theme={darkTheme} for diagnostics, can be re-added */}
          <XellarAuthProvider>
            {children}
          </XellarAuthProvider>
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
