// context/index.tsx
'use client'

import { wagmiAdapter, projectId, networks as configNetworks } from '../config'; // Use networks from config
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react'; 
import React, { type ReactNode } from 'react';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi';

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  // This check is also in config/index.ts, but good for safety
  throw new Error('Project ID is not defined for Reown AppKit');
}

// Set up metadata for Reown AppKit modal
const metadata = {
  name: 'CryptoIndexFund',
  description: 'Invest in crypto with transparency and decentralization. Welcome to CryptoIndexFund.',
  url: 'https://www.cryptoindexfund.ai', // Your production domain
  icons: ['https://www.cryptoindexfund.ai/android-chrome-192x192.png'] // URL to your logo
};

// Create the Reown AppKit modal
// This initializes AppKit but doesn't open the modal yet.
// The modal opening is typically handled by a hook or a specific button component from Reown AppKit.
export const appKitModal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: configNetworks, // Use the same networks as defined in config/index.ts
  defaultNetwork: configNetworks[0] || undefined, // Default to the first network in the list
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  }
});

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
