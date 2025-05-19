
"use client";

import type { Config } from 'wagmi';
import { createConfig, http } from 'wagmi'; // Ensure createConfig and http are imported for the fallback
import { polygonAmoy, mainnet } from 'viem/chains'; // Ensure mainnet is imported for the fallback
import { QueryClient } from '@tanstack/react-query';
import { defaultConfig as xellarDefaultConfig } from '@xellar/kit';

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const xellarProjectId = process.env.NEXT_PUBLIC_XELLAR_PROJECT_ID;
const disableXellarInDev = process.env.NEXT_PUBLIC_DISABLE_XELLAR_IN_DEV === 'true';

// Log environment variables to help diagnose issues, especially on Vercel
console.log("[Xellar Config] WalletConnect Project ID being used:", walletConnectProjectId);
console.log("[Xellar Config] Xellar Project ID being used:", xellarProjectId);
console.log("[Xellar Config] Disable Xellar in Dev:", disableXellarInDev);
console.log("[Xellar Config] Xellar Environment being used for defaultConfig:", disableXellarInDev ? "N/A (Xellar Disabled)" : "production");


let wagmiConfigValue: Config;

if (disableXellarInDev) {
  // Basic non-Xellar Wagmi config for when Xellar is explicitly disabled
  // Using mainnet as a fallback chain example
  wagmiConfigValue = createConfig({
    chains: [mainnet, polygonAmoy],
    transports: {
      [mainnet.id]: http(),
      [polygonAmoy.id]: http(),
    },
    ssr: true,
  });
} else {
  if (!walletConnectProjectId) {
    console.error(
      '[Xellar Config] CRITICAL: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect functionality via Xellar will be impaired or fail.'
    );
  }
  if (!xellarProjectId) {
    console.error(
      '[Xellar Config] CRITICAL: NEXT_PUBLIC_XELLAR_PROJECT_ID is not set. Xellar features will likely not work.'
    );
  }

  // Xellar-enabled Wagmi config
  wagmiConfigValue = xellarDefaultConfig({
    appName: 'CryptoIndexFund',
    walletConnectProjectId: walletConnectProjectId!,
    xellarAppId: xellarProjectId!,
    xellarEnv: "production", // Changed to production
    chains: [polygonAmoy], // Consider changing to production chains like polygon mainnet if applicable
    ssr: true,
  }) as Config;
}

export const wagmiConfig = wagmiConfigValue;
