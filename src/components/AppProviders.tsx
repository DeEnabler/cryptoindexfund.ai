
"use client";

import type { PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
// Assuming AppKitProvider and darkTheme are from @reown/appkit
import { AppKitProvider, darkTheme } from '@reown/appkit'; 
import { XellarProvider as CustomXellarProvider } from '@/contexts/XellarContext'; // Renaming this context might be a good idea later
import { wagmiConfig, queryClient } from '@/lib/xellarConfig'; // Path is fine, content of xellarConfig changed

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider theme={darkTheme}> {/* Assuming AppKitProvider and theme prop */}
          <CustomXellarProvider>
            {children}
          </CustomXellarProvider>
        </AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
