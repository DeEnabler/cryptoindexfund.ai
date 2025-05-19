
"use client";

import type { PropsWithChildren } from 'react';
import { useState, useEffect } from 'react';
import { type Config, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { XellarKitProvider, darkTheme } from '@xellar/kit';
import { XellarAuthProvider } from '@/contexts/XellarContext';
import { wagmiConfig, queryClient } from '@/lib/xellarConfig';
import ErrorBoundary from './ErrorBoundary';

// Ensure NEXT_PUBLIC_DISABLE_XELLAR_IN_DEV is set to 'false' (or not set at all)
// in your Vercel environment variables for production/live testing of Xellar.
const disableXellarInDev = process.env.NEXT_PUBLIC_DISABLE_XELLAR_IN_DEV === 'true';

export function AppProviders({ children }: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fallback UI for when XellarKitProvider or its children crash during initialization.
  // This renders XellarAuthProvider in a "forced disable" state.
  const xellarErrorFallback = (
    <XellarAuthProvider forceDisable={true}>
      {children}
    </XellarAuthProvider>
  );

  if (disableXellarInDev) {
    // Xellar is explicitly disabled by environment variable
    return (
      <WagmiProvider config={wagmiConfig as Config}>
        <QueryClientProvider client={queryClient}>
          <XellarAuthProvider>
            {children}
          </XellarAuthProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }

  // Xellar is enabled, proceed with full provider stack
  return (
    <WagmiProvider config={wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>
        {isMounted ? (
          // On the client and Xellar is enabled, render the full Xellar stack
          <ErrorBoundary fallback={xellarErrorFallback}>
            <XellarKitProvider theme={darkTheme}>
              <XellarAuthProvider>
                {children}
              </XellarAuthProvider>
            </XellarKitProvider>
          </ErrorBoundary>
        ) : (
          // During SSR or before client mount (when Xellar is enabled)
          // Render XellarAuthProvider which handles its own client-side hook deferral.
          // XellarKitProvider is skipped here to avoid SSR issues.
          <XellarAuthProvider>
            {children}
          </XellarAuthProvider>
        )}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
