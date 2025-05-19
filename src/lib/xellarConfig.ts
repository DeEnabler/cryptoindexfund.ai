
"use client";

import type { Config } from 'wagmi';
import { createConfig, http } from 'wagmi'; // Added createConfig and http for basic fallback
import { QueryClient } from '@tanstack/react-query';
import { defaultConfig as xellarDefaultConfig } from '@xellar/kit'; // Aliased to avoid confusion if other defaultConfig is used
import { mainnet, polygonAmoy } from 'viem/chains'; // Using polygonAmoy as per Xellar's example

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const xellarProjectId = process.env.NEXT_PUBLIC_XELLAR_PROJECT_ID;
const disableXellarInDev = process.env.NEXT_PUBLIC_DISABLE_XELLAR_IN_DEV === 'true';
const xellarTargetEnv = "sandbox"; // Matching Xellar's example for the new App ID

console.log("[Xellar Config] WalletConnect Project ID being used:", walletConnectProjectId);
console.log("[Xellar Config] Xellar Project ID being used:", xellarProjectId);
console.log("[Xellar Config] Disable Xellar in Dev:", disableXellarInDev);
console.log("[Xellar Config] Xellar Environment being used for defaultConfig:", xellarTargetEnv);

let wagmiConfigValue: Config;

if (disableXellarInDev) {
  // Basic non-Xellar Wagmi config for when Xellar is explicitly disabled
  wagmiConfigValue = createConfig({
    chains: [mainnet, polygonAmoy], // Keep chains consistent if possible
    transports: {
      [mainnet.id]: http(),
      [polygonAmoy.id]: http(),
    },
    ssr: true,
  });
} else {
  if (!walletConnectProjectId) {
    console.warn(
      '[Xellar Config] CRITICAL: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect functionality via Xellar will be impaired or fail.'
    );
  }
  if (!xellarProjectId) {
    console.error(
      '[Xellar Config] CRITICAL: NEXT_PUBLIC_XELLAR_PROJECT_ID is not set. Xellar features will likely not work.'
    );
  }

  wagmiConfigValue = xellarDefaultConfig({
    appName: 'CryptoIndexFund', // Your app's name
    walletConnectProjectId: walletConnectProjectId!, // Assumes this will be set
    xellarAppId: xellarProjectId!, // Assumes this will be set
    xellarEnv: xellarTargetEnv,
    chains: [polygonAmoy], // Specify the chains you want to support
    ssr: true, // Important for Next.js App Router
  }) as Config;
}

export const wagmiConfig = wagmiConfigValue;
