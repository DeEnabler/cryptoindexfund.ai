
"use client";

import type { PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
// Updated to import AppKit and assume darkTheme might be handled differently or is a default
import { AppKit } from '@reown/appkit'; 
import { ReownAuthProvider } from '@/contexts/ReownAuthContext';
import { wagmiConfig, queryClient } from '@/lib/reownConfig';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {/* Changed AppKitProvider to AppKit, removed theme prop for now */}
        <AppKit> 
          <ReownAuthProvider>
            {children}
          </ReownAuthProvider>
        </AppKit>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
