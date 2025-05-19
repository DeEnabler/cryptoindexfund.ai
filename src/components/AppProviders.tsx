
"use client";

import type { PropsWithChildren } from 'react';
import { useState, useEffect } from 'react';
import { type Config, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { XellarKitProvider, darkTheme } from '@xellar/kit';
import { XellarAuthProvider } from '@/contexts/XellarContext';
import { wagmiConfig, queryClient } from '@/lib/xellarConfig';

const disableXellarInDev = process.env.NEXT_PUBLIC_DISABLE_XELLAR_IN_DEV === 'true';

export function AppProviders({ children }: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // WagmiProvider, QueryClientProvider, and XellarAuthProvider will always be rendered.
  // XellarAuthProvider itself handles its internal state based on disableXellarInDev and isMounted.
  // XellarKitProvider is conditional on isMounted and !disableXellarInDev, as it might have client-side dependencies
  // or cause issues (like "Failed to fetch app config") during SSR if not properly configured.

  return (
    <WagmiProvider config={wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>
        <XellarAuthProvider>
          {disableXellarInDev ? (
            <>
              {/* Xellar is disabled, XellarKitProvider is not rendered */}
              {/* console.log added here if needed for debugging the disabled path, but generally keep console logs out of production code */}
              {children}
            </>
          ) : isMounted ? (
            <XellarKitProvider theme={darkTheme}>
              {/* Xellar is enabled AND client is mounted */}
              {children}
            </XellarKitProvider>
          ) : (
            <>
              {/* Xellar is enabled BUT client is NOT yet mounted (SSR/build), XellarKitProvider is skipped */}
              {/* This ensures children are rendered during SSR/build even if XellarKitProvider isn't ready */}
              {children}
            </>
          )}
        </XellarAuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
