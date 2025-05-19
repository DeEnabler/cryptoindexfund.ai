
"use client";

import type { PropsWithChildren } from 'react';
import { useState, useEffect } from 'react';
import { type Config, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { XellarKitProvider, darkTheme } from '@xellar/kit'; 
import { XellarAuthProvider } from '@/contexts/XellarContext';
import { wagmiConfig, queryClient } from '@/lib/xellarConfig';
import ErrorBoundary from './ErrorBoundary';

const disableXellarInDev = process.env.NEXT_PUBLIC_DISABLE_XELLAR_IN_DEV === 'true';

export function AppProviders({ children }: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fallback UI to render if XellarKitProvider (or its children during init) crashes.
  // This fallback renders XellarAuthProvider in a "forced disable" mode.
  const xellarErrorFallback = (
    <XellarAuthProvider forceDisable={true}>
      {children}
    </XellarAuthProvider>
  );

  return (
    <WagmiProvider config={wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>
        {disableXellarInDev ? (
          // Xellar is disabled by environment variable, render XellarAuthProvider in its default (likely disabled) state.
          <XellarAuthProvider>
            {children}
          </XellarAuthProvider>
        ) : isMounted ? (
          // Xellar is enabled AND client is mounted.
          // Render the full Xellar stack, wrapped in an ErrorBoundary.
          <ErrorBoundary fallback={xellarErrorFallback}>
            <XellarKitProvider theme={darkTheme}>
              <XellarAuthProvider>
                {children}
              </XellarAuthProvider>
            </XellarKitProvider>
          </ErrorBoundary>
        ) : (
          // Xellar is enabled BUT client is NOT yet mounted (e.g., SSR/build time).
          // Render XellarAuthProvider; it defers its internal Xellar hook calls until mounted.
          // XellarKitProvider is skipped here to avoid potential SSR/build issues if it's not SSR-compatible
          // or if it tries to fetch config immediately.
          <XellarAuthProvider>
            {children}
          </XellarAuthProvider>
        )}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
