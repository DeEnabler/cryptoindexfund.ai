
"use client";

import { createConfig, http, type Config } from 'wagmi';
import { polygonAmoy } from 'viem/chains';
// Corrected imports for Wagmi connectors
import { injected, walletConnect } from '@wagmi/connectors';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

// Log the project IDs to ensure they are loaded correctly
console.log('[Wagmi Config] WalletConnect Project ID being used:', walletConnectProjectId);

if (!walletConnectProjectId) {
  console.error(
    '[Wagmi Config] FATAL ERROR: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect functionality will be unavailable and may cause errors.'
  );
}

const metadata = {
  name: 'CryptoIndexFund',
  description: 'CryptoIndexFund - Decentralized Crypto Fund',
  url: 'https://www.cryptoindexfund.ai',
  icons: ['https://www.cryptoindexfund.ai/android-chrome-192x192.png'],
};

// Base connectors array
const connectors = [
  injected({ shimDisconnect: true }),
];

// Conditionally add WalletConnect connector if projectId is available
if (walletConnectProjectId) {
  connectors.push(
    walletConnect({
      projectId: walletConnectProjectId,
      metadata,
      showQrModal: true,
    })
  );
} else {
  console.warn('[Wagmi Config] WalletConnect connector not initialized due to missing project ID.');
}

export const wagmiConfig = createConfig({
  chains: [polygonAmoy] as const,
  connectors,
  transports: {
    [polygonAmoy.id]: http(),
  },
  ssr: true, // Important for Next.js App Router
}) as Config;
