
"use client";

import type { Config } from 'wagmi';
import { QueryClient } from '@tanstack/react-query';
// Import defaultConfig from @xellar/kit
import { defaultConfig } from '@xellar/kit';
import { polygonAmoy } from 'viem/chains'; // Updated to use polygonAmoy

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

// Use defaultConfig from @xellar/kit
export const wagmiConfig = defaultConfig({
  appName: "TrustVest",
  // @ts-ignore WalletConnect Project ID might be undefined if not set, Xellar's defaultConfig should handle this gracefully or error.
  walletConnectProjectId: walletConnectProjectId!,
  // @ts-ignore Xellar Project ID
  xellarAppId: xellarProjectId!,
  chains: [polygonAmoy], // Updated to use polygonAmoy
  xellarEnv: "sandbox", // Or "production", verify with Xellar docs
  ssr: true, // For Next.js App Router
}) as Config; // Added type casting

