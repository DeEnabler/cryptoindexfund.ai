
"use client";

import type { PropsWithChildren } from 'react';
import { useState, useEffect } from 'react';
import { type Config, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext'; // Updated import
import { wagmiConfig, queryClient } from '@/lib/wagmiConfig'; // Updated import
// ErrorBoundary is removed as XellarKitProvider (the primary source of uncatchable init errors) is removed.
// Standard Wagmi errors are handled by Wagmi's internals or within AuthProvider.

export function AppProviders({ children }: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a minimal version or null during SSR / before client mount
    // to ensure client-only hooks in AuthProvider don't break SSR.
    // AuthProvider itself handles its internal state if hooks are not ready.
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
    );
  }

  // On the client, render the full Wagmi stack
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
