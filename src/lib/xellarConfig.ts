
"use client";

import type { Config } from 'wagmi';
import { QueryClient } from '@tanstack/react-query';
// Import defaultConfig from @xellar/kit
import { defaultConfig as xellarDefaultConfig } from '@xellar/kit';
import { polygonAmoy } from 'viem/chains'; // Using polygonAmoy as per previous successful setup

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const xellarProjectId = process.env.NEXT_PUBLIC_XELLAR_PROJECT_ID;

// Log for debugging
console.log("[Xellar Config] WalletConnect Project ID being used:", walletConnectProjectId);
console.log("[Xellar Config] Xellar Project ID being used:", xellarProjectId);

if (!walletConnectProjectId) {
  console.warn(
    'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set in .env file. WalletConnect functionality will be impaired. Get ID from https://cloud.walletconnect.com/'
  );
}
if (!xellarProjectId) {
  console.error(
    'CRITICAL: NEXT_PUBLIC_XELLAR_PROJECT_ID is not set in .env file. Xellar features will likely not work.'
  );
}

export const wagmiConfig = xellarDefaultConfig({
  appName: 'CryptoIndexFund',
  // @ts-ignore - Trusting Xellar's defaultConfig to handle potentially undefined projectId
  walletConnectProjectId: walletConnectProjectId!,
  // @ts-ignore - Trusting Xellar's defaultConfig to handle potentially undefined appId
  xellarAppId: xellarProjectId!,
  xellarEnv: 'sandbox', // Ensure this matches your Xellar dashboard app environment
  chains: [polygonAmoy], // Ensure this chain is configured on your Xellar dashboard app
  ssr: true,
}) as Config; // Cast to Config type from wagmi
