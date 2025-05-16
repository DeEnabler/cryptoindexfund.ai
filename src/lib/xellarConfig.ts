
"use client"; // Ensure this file can use process.env for client-side vars

import { QueryClient } from '@tanstack/react-query';
import { defaultConfig as xellarDefaultConfig } from '@xellar/kit';
import { mainnet, sepolia, bsc, polygon } from 'wagmi/chains'; // Added more common chains

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const xellarProjectId = process.env.NEXT_PUBLIC_XELLAR_PROJECT_ID;

if (!walletConnectProjectId || walletConnectProjectId === "your_wallet_connect_project_id_here") {
  console.warn("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set or is a placeholder. Xellar/WalletConnect might not work correctly. Get ID from https://cloud.walletconnect.com/");
}
if (!xellarProjectId) {
  // This check should ideally prevent the app from running if the ID is missing.
  // For now, we'll log an error, but in a real app, you might throw or handle differently.
  console.error("CRITICAL: NEXT_PUBLIC_XELLAR_PROJECT_ID is not set in .env file. Xellar features will not work.");
}

// xellarDefaultConfig already returns a complete Wagmi config object
export const wagmiConfig = xellarDefaultConfig({
  appName: "TrustVest",
  // @ts-ignore WalletConnect Project ID can be undefined, Xellar's defaultConfig should handle it gracefully or error if truly required
  walletConnectProjectId: walletConnectProjectId!, // Use non-null assertion if you are sure it will be there or handled by xellar
  xellarAppId: xellarProjectId!, // Use non-null assertion, assuming it's critical
  xellarEnv: "sandbox", // Or "production" based on your Xellar setup
  chains: [mainnet, sepolia, bsc, polygon], // Example chains, configure as needed
  ssr: true, // For Next.js App Router
});

