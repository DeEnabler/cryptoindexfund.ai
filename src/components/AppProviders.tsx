
"use client";

import type { PropsWithChildren } from 'react';
// No longer need useState, useEffect here for this specific purpose
import { type Config, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { wagmiConfig, queryClient } from '@/lib/wagmiConfig';

export function AppProviders({ children }: PropsWithChildren) {
  // WagmiProvider is SSR-safe.
  // AuthProvider internally manages its mounted state to correctly use hook values
  // and provide appropriate context values during SSR and after client mount.
  return (
    <WagmiProvider config={wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
