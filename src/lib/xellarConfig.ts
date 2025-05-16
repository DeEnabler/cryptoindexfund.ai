
"use client"; // Ensure this file can use process.env for client-side vars

import { createConfig } from 'wagmi';
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
  throw new Error("NEXT_PUBLIC_XELLAR_PROJECT_ID is not set in .env file");
}

export const wagmiConfig = createConfig(xellarDefaultConfig({
  appName: "TrustVest",
  // @ts-ignore // walletConnectProjectId could be undefined if not set, default config handles it
  walletConnectProjectId: walletConnectProjectId, 
  xellarAppId: xellarProjectId,
  xellarEnv: "sandbox", // Or "production" based on your Xellar setup
  chains: [mainnet, sepolia, bsc, polygon], // Example chains, configure as needed
  ssr: true, // For Next.js App Router
}));
