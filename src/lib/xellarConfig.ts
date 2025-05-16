
"use client";

import { QueryClient } from '@tanstack/react-query';
// Import getDefaultConfig from @xellar/kit
import { getDefaultConfig } from '@xellar/kit';
import { mainnet, sepolia, bsc, polygon } from 'wagmi/chains';

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const xellarProjectId = process.env.NEXT_PUBLIC_XELLAR_PROJECT_ID;

// For debugging: Log the values being used
console.log("[Xellar Config] WalletConnect Project ID being used:", walletConnectProjectId);
console.log("[Xellar Config] Xellar Project ID being used:", xellarProjectId);

if (!walletConnectProjectId) {
  console.warn("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect functionality may be impaired. Get ID from https://cloud.walletconnect.com/");
}
if (!xellarProjectId) {
  console.error("CRITICAL: NEXT_PUBLIC_XELLAR_PROJECT_ID is not set in .env file. Xellar Kit features will likely not work.");
}

// Use getDefaultConfig from @xellar/kit
export const wagmiConfig = getDefaultConfig({
  appName: "TrustVest",
  // @ts-ignore WalletConnect Project ID might be undefined if not set, Xellar's defaultConfig should handle this gracefully or error.
  walletConnectProjectId: walletConnectProjectId!,
  // @ts-ignore Xellar Project ID, assuming it's called xellarAppId by their config
  xellarAppId: xellarProjectId!,
  chains: [mainnet, sepolia, bsc, polygon], // Example chains, ensure these are supported by Xellar or configure as needed
  xellarEnv: "sandbox", // Or "production", verify with Xellar docs
  ssr: true, // For Next.js App Router
});
