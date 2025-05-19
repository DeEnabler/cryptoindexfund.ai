
"use client";

import { createConfig, http, type Config } from 'wagmi';
import { polygonAmoy } from 'viem/chains';
import { injected /*, walletConnect */ } from '@wagmi/connectors'; // Temporarily comment out walletConnect
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

// Log the project IDs to ensure they are loaded correctly
console.log('[Wagmi Config] WalletConnect Project ID being used:', walletConnectProjectId);


if (!walletConnectProjectId && process.env.NODE_ENV !== 'development') { // WalletConnect is optional in dev if not used
  console.warn(
    '[Wagmi Config] WARNING: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect functionality will be unavailable.'
  );
}

const metadata = {
  name: 'CryptoIndexFund',
  description: 'CryptoIndexFund - Decentralized Crypto Fund',
  url: 'https://www.cryptoindexfund.ai',
  icons: ['https://www.cryptoindexfund.ai/android-chrome-192x192.png'],
};

const chainsToUse = [polygonAmoy] as const;

export const wagmiConfig = createConfig({
  chains: chainsToUse,
  connectors: [
    injected({ shimDisconnect: true }),
    // Temporarily remove WalletConnect connector to isolate the "cloud.reown.com" issue
    /*
    ...(walletConnectProjectId
      ? [
          walletConnect({
            projectId: walletConnectProjectId,
            metadata,
            showQrModal: true,
          }),
        ]
      : []),
    */
  ],
  transports: chainsToUse.reduce((acc, chain) => {
    acc[chain.id] = http();
    return acc;
  }, {} as Record<number, ReturnType<typeof http>>),
  ssr: true,
}) as Config; // Cast to Config if createConfig return type is too broad
