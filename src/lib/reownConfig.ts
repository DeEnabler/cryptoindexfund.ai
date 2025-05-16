
"use client"; 

import { QueryClient } from '@tanstack/react-query';
// Assuming defaultConfig for wagmi adapter is from @reown/appkit-adapter-wagmi
import { defaultConfig as reownWagmiAdapterConfig } from '@reown/appkit-adapter-wagmi'; 
import { mainnet, sepolia, bsc, polygon } from 'wagmi/chains';

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const reownAppId = process.env.NEXT_PUBLIC_REOWN_APP_ID;

// For debugging: Log the values being used
console.log("[Reown Config] WalletConnect Project ID being used:", walletConnectProjectId);
console.log("[Reown Config] Reown App ID being used:", reownAppId);


if (!walletConnectProjectId || walletConnectProjectId === "your_actual_walletconnect_project_id_here") {
  console.warn("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set or is a placeholder. Reown AppKit/WalletConnect might not work correctly. Get ID from https://cloud.walletconnect.com/");
}
if (!reownAppId) {
  console.error("CRITICAL: NEXT_PUBLIC_REOWN_APP_ID is not set in .env file. Reown AppKit features will not work.");
}

// reownWagmiAdapterConfig should return a complete Wagmi config object
export const wagmiConfig = reownWagmiAdapterConfig({
  appName: "TrustVest",
  walletConnectProjectId: walletConnectProjectId!, 
  appId: reownAppId!, // Assuming the param name is appId for Reown
  // env: "sandbox", // Assuming 'env' is a param for Reown, similar to Xellar. Verify this.
  chains: [mainnet, sepolia, bsc, polygon],
  ssr: true, 
});
