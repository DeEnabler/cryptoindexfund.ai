
"use client";

import { QueryClient } from '@tanstack/react-query';
// defaultConfig is expected from @reown/appkit, not @reown/appkit-adapter-wagmi
import { defaultConfig as reownAppkitDefaultConfig } from '@reown/appkit';
import { mainnet, sepolia, bsc, polygon } from 'wagmi/chains';

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const reownAppId = process.env.NEXT_PUBLIC_REOWN_APP_ID;

// For debugging: Log the values being used
console.log("[Reown Config] WalletConnect Project ID being used:", walletConnectProjectId);
console.log("[Reown Config] Reown App ID being used:", reownAppId);


if (!walletConnectProjectId) {
  console.warn("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set or is a placeholder. Reown AppKit/WalletConnect might not work correctly. Get ID from https://cloud.walletconnect.com/");
}
if (!reownAppId) {
  console.error("CRITICAL: NEXT_PUBLIC_REOWN_APP_ID is not set in .env file. Reown AppKit features will not work.");
}

// reownAppkitDefaultConfig should return a complete Wagmi config object
export const wagmiConfig = reownAppkitDefaultConfig({
  appName: "TrustVest",
  walletConnectProjectId: walletConnectProjectId!,
  appId: reownAppId!,
  reownEnv: "sandbox", // Assuming 'reownEnv' is the correct parameter name, similar to 'xellarEnv'. Verify with Reown docs.
  chains: [mainnet, sepolia, bsc, polygon], // Ensure these are the chains you intend to support
  ssr: true,
});

