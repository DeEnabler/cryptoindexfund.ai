
"use client";

import { type Config, createConfig, http } from 'wagmi';
import { QueryClient } from '@tanstack/react-query';
// Import defaultConfig from @xellar/kit
import { defaultConfig as xellarDefaultConfig } from '@xellar/kit';
import { polygonAmoy } from 'viem/chains'; // Using polygonAmoy as per previous successful setup

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const xellarProjectId = process.env.NEXT_PUBLIC_XELLAR_PROJECT_ID;
const disableXellarInDev = process.env.NEXT_PUBLIC_DISABLE_XELLAR_IN_DEV === 'true';

// Log for debugging
console.log("[Xellar Config] WalletConnect Project ID being used:", walletConnectProjectId);
console.log("[Xellar Config] Xellar Project ID being used:", xellarProjectId);
console.log("[Xellar Config] Disable Xellar in Dev:", disableXellarInDev);


let wagmiConfigValue: Config;

if (disableXellarInDev) {
  console.log("[Xellar Config] Xellar SDK disabled for this environment. Using basic Wagmi config.");
  wagmiConfigValue = createConfig({
    chains: [polygonAmoy], // Minimal chain setup
    transports: {
      [polygonAmoy.id]: http(),
    },
    ssr: true,
  });
} else {
  if (!walletConnectProjectId) {
    console.warn(
      'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect functionality via Xellar will be impaired.'
    );
  }
  if (!xellarProjectId) {
    console.error(
      'CRITICAL: NEXT_PUBLIC_XELLAR_PROJECT_ID is not set. Xellar features will likely not work.'
    );
  }

  wagmiConfigValue = xellarDefaultConfig({
    appName: 'CryptoIndexFund',
    // @ts-ignore walletConnectProjectId could be undefined if not set, xellarDefaultConfig should handle it or warn
    walletConnectProjectId: walletConnectProjectId!,
    // @ts-ignore xellarAppId could be undefined if not set, xellarDefaultConfig should handle it or warn
    xellarAppId: xellarProjectId!,
    xellarEnv: 'sandbox', // Ensure this matches your Xellar dashboard app environment
    chains: [polygonAmoy], // Ensure this chain is configured on your Xellar dashboard app
    ssr: true,
  }) as Config; // Cast to Config type from wagmi
}

export const wagmiConfig = wagmiConfigValue;
