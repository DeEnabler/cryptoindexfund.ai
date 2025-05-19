
"use client";

import type { PropsWithChildren } from 'react';
import { useState, useEffect } from 'react'; // Added useState, useEffect
import { WagmiProvider, type Config } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { XellarKitProvider } from '@xellar/kit'; 
import { XellarAuthProvider } from '@/contexts/XellarContext';
import { wagmiConfig, queryClient } from '@/lib/xellarConfig';

const disableXellarInDev = process.env.NEXT_PUBLIC_DISABLE_XELLAR_IN_DEV === 'true';

export function AppProviders({ children }: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (disableXellarInDev) {
    console.log("[AppProviders] XellarKitProvider is DISABLED for this environment.");
    // For disabled state, we can render children directly or with a minimal WagmiProvider if still needed
    // For simplicity, if Xellar is disabled, we provide a very basic setup.
    // If even basic WagmiProvider (mocked in xellarConfig) causes issues, this can be just {children}
    return (
      <WagmiProvider config={wagmiConfig as Config}> {/* Ensure wagmiConfig is cast if it can be a mock */}
        <QueryClientProvider client={queryClient}>
          <XellarAuthProvider> {/* This will provide mocked context */}
            {children}
          </XellarAuthProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }

  // Only render the full Xellar-enabled provider stack if mounted on the client
  if (!isMounted) {
    // Render null or a loading state, or just children if a brief unstyled flash is acceptable
    // Returning null will prevent children from rendering until client mount,
    // which might be desired if they depend heavily on these contexts.
    // Alternatively, pass children through if they can render without these contexts initially.
    // For now, let's pass children through to avoid completely blanking the page during SSR.
    // A more sophisticated solution might involve a loading skeleton.
    return <>{children}</>; 
  }

  console.log("[AppProviders] XellarKitProvider is ENABLED for this environment (Client Mounted).");
  return (
    <WagmiProvider config={wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider> {/* Removed theme prop for diagnostics, can be re-added if Xellar docs confirm usage */}
          <XellarAuthProvider>
            {children}
          </XellarAuthProvider>
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
