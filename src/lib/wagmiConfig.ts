
"use client";

import { createConfig, http, type Config } from 'wagmi';
import { polygonAmoy, mainnet } from 'viem/chains'; // Keep polygonAmoy for now, user might change for production
import { injected, walletConnect } from '@wagmi/connectors';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

console.log("[Wagmi Config] WalletConnect Project ID being used:", walletConnectProjectId);

if (!walletConnectProjectId) {
  console.error(
    '[Wagmi Config] CRITICAL: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect functionality will be impaired or fail.'
  );
  // Potentially throw an error or use a fallback if this ID is absolutely critical for app operation
}

const chainsToUse = [polygonAmoy]; // Default to polygonAmoy, can be configured further or made dynamic

export const wagmiConfig = createConfig({
  chains: chainsToUse,
  connectors: [
    injected(),
    walletConnect({
      projectId: walletConnectProjectId || "", // Fallback to empty string if undefined, though WalletConnect might error.
      metadata: {
        name: 'CryptoIndexFund',
        description: 'CryptoIndexFund - Decentralized Crypto Fund',
        url: 'https://www.cryptoindexfund.ai', // replace with your deployed Vercel URL
        icons: ['https://www.cryptoindexfund.ai/android-chrome-192x192.png'], // replace with your logo
      },
      //showQrModal: true, // (Optional) Show QR modal if not using a dedicated modal library
    }),
  ],
  transports: chainsToUse.reduce((acc, chain) => {
    acc[chain.id] = http();
    return acc;
  }, {} as Record<number, ReturnType<typeof http>>),
  ssr: true,
});
