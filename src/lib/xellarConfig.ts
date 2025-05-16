
"use client"; // Ensure this file can use process.env for client-side vars

import { QueryClient } from '@tanstack/react-query';
import { defaultConfig as xellarDefaultConfig } from '@xellar/kit'; // Renamed for clarity, it's Xellar's default config
import { mainnet, sepolia, bsc, polygon } from 'wagmi/chains'; // Added more common chains

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const xellarProjectId = process.env.NEXT_PUBLIC_XELLAR_PROJECT_ID;

// For debugging: Log the values being used
console.log("[Xellar Config] WalletConnect Project ID being used:", walletConnectProjectId);
console.log("[Xellar Config] Xellar Project ID being used:", xellarProjectId);


if (!walletConnectProjectId || walletConnectProjectId === "your_wallet_connect_project_id_here") {
  console.warn("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set or is a placeholder. Xellar/WalletConnect might not work correctly. Get ID from https://cloud.walletconnect.com/");
}
if (!xellarProjectId) {
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
