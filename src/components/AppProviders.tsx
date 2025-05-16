
"use client";

import type { PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
// AppKit from '@reown/appkit' is likely a class for SDK configuration or utility, not a Provider component.
// We removed the direct import of AppKit as a component.
// If specific initialization for AppKit is needed elsewhere, it should be done according to Reown's documentation.
import { ReownAuthProvider } from '@/contexts/ReownAuthContext';
import { wagmiConfig, queryClient } from '@/lib/reownConfig';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ReownAuthProvider>
          {children}
        </ReownAuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
