
"use client";

import type { PropsWithChildren } from 'react';
// Removed WagmiProvider, QueryClientProvider, and XellarKitProvider as Xellar integration is disabled
// Removed wagmiConfig, queryClient imports
import { XellarAuthProvider } from '@/contexts/XellarContext'; // This will use the mocked context

export function AppProviders({ children }: PropsWithChildren) {
  return (
    // WagmiProvider, QueryClientProvider, and XellarKitProvider are removed
    // to disable the Xellar wallet connection functionality temporarily.
    // The XellarAuthProvider remains to provide a mocked context,
    // ensuring components like the Header don't break.
    <XellarAuthProvider>
      {children}
    </XellarAuthProvider>
  );
}
