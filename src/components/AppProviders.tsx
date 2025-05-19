
"use client";

import type { PropsWithChildren } from 'react';
import { useState, useEffect } from 'react';
import { type Config, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { XellarKitProvider, darkTheme } from '@xellar/kit'; // Assuming darkTheme is a valid export
import { XellarAuthProvider } from '@/contexts/XellarContext';
import { wagmiConfig, queryClient } from '@/lib/xellarConfig';

const disableXellarInDev = process.env.NEXT_PUBLIC_DISABLE_XELLAR_IN_DEV === 'true';

export function AppProviders({ children }: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // WagmiProvider and QueryClientProvider are always top-level
  return (
    <WagmiProvider config={wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>
        {disableXellarInDev ? (
          // Xellar is disabled, provide XellarAuthProvider in its disabled state
          <XellarAuthProvider>
            {children}
          </XellarAuthProvider>
        ) : isMounted ? (
          // Xellar is enabled AND client is mounted, render the full Xellar stack
          // XellarKitProvider wraps XellarAuthProvider
          <XellarKitProvider theme={darkTheme}>
            <XellarAuthProvider>
              {children}
            </XellarAuthProvider>
          </XellarKitProvider>
        ) : (
          // Xellar is enabled BUT client is NOT yet mounted (SSR/build)
          // Render XellarAuthProvider (which defers its internal Xellar hook calls)
          // XellarKitProvider is skipped here to avoid SSR/build issues from it.
          <XellarAuthProvider>
            {children}
          </XellarAuthProvider>
        )}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
