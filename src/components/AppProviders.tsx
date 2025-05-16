
"use client";

import type { PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { XellarKitProvider, darkTheme } from '@xellar/kit'; // Added darkTheme import
import { XellarProvider as CustomXellarProvider } from '@/contexts/XellarContext';
import { wagmiConfig, queryClient } from '@/lib/xellarConfig';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider theme={darkTheme}> {/* Added theme prop */}
          <CustomXellarProvider>
            {children}
          </CustomXellarProvider>
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
