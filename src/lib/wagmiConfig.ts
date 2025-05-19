
"use client";

import { createConfig, http, type Config, type Connector } from 'wagmi';
import { polygonAmoy } from 'viem/chains';
import { injected, walletConnect } from '@wagmi/connectors';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

console.log('[Wagmi Config] WalletConnect Project ID being used:', walletConnectProjectId);

// Ensure project ID is available for WalletConnect
if (!walletConnectProjectId) {
  console.error(
    '[Wagmi Config] FATAL ERROR: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect functionality will be unavailable.'
  );
}

const configuredConnectors: Connector[] = [injected()];

if (walletConnectProjectId) {
  configuredConnectors.push(
    walletConnect({
      projectId: walletConnectProjectId,
      metadata: {
        name: 'CryptoIndexFund',
        description: 'CryptoIndexFund - Decentralized Crypto Fund',
        url: 'https://www.cryptoindexfund.ai', // Your live site URL
        icons: ['https://www.cryptoindexfund.ai/android-chrome-192x192.png'], // URL to your logo
      },
      showQrModal: true,
    })
  );
} else {
  console.warn('[Wagmi Config] WalletConnect connector not initialized due to missing project ID.');
}


export const wagmiConfig = createConfig({
  chains: [polygonAmoy] as const,
  connectors: configuredConnectors,
  transports: {
    [polygonAmoy.id]: http(),
  },
  ssr: true, // Important for Next.js App Router
}) as Config;
