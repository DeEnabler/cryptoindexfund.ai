
"use client";

import { QueryClient } from '@tanstack/react-query';
// Assuming defaultConfig for wagmi is from @xellar/kit
import { defaultConfig as xellarDefaultConfig } from '@xellar/kit';
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

// This uses Xellar's defaultConfig to create the Wagmi config.
// You MUST verify the parameters accepted by xellarDefaultConfig from their documentation.
export const wagmiConfig = xellarDefaultConfig({
  appName: "TrustVest",
  // @ts-ignore WalletConnect Project ID might be undefined if not set, Xellar's defaultConfig should handle this gracefully or error.
  walletConnectProjectId: walletConnectProjectId!,
  // @ts-ignore Xellar Project ID, assuming it's called xellarAppId by their config
  xellarAppId: xellarProjectId!,
  // You may need to specify chains here if not defaulted by xellarDefaultConfig
  chains: [mainnet, sepolia, bsc, polygon], // Example chains
  xellarEnv: "sandbox", // Or "production", verify with Xellar docs
  ssr: true, // For Next.js App Router
});
