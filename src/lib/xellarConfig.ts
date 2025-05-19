
"use client";

import type { Config } from 'wagmi';
import { createConfig, http } from 'wagmi'; // For fallback
import { QueryClient } from '@tanstack/react-query';
// defaultConfig is expected from @xellar/kit
import { defaultConfig as xellarDefaultConfig } from '@xellar/kit';
import { polygonAmoy, mainnet } from 'viem/chains'; // Keep polygonAmoy for now, user might change for production

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const xellarProjectId = process.env.NEXT_PUBLIC_XELLAR_PROJECT_ID;
const disableXellarInDev = process.env.NEXT_PUBLIC_DISABLE_XELLAR_IN_DEV === 'true';

// Log environment variables to help diagnose issues
console.log("[Xellar Config] WalletConnect Project ID being used:", walletConnectProjectId);
console.log("[Xellar Config] Xellar Project ID being used:", xellarProjectId);
console.log("[Xellar Config] Disable Xellar in Dev:", disableXellarInDev);
console.log("[Xellar Config] Xellar Environment being used for defaultConfig:", "production");


let wagmiConfigValue: Config;

if (disableXellarInDev) {
  // Basic non-Xellar Wagmi config for when Xellar is explicitly disabled
  wagmiConfigValue = createConfig({
    chains: [mainnet, polygonAmoy], // Default chains for disabled mode
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
    xellarEnv: "production", // Explicitly set to production
    // TODO: Update chains for your actual production environment if polygonAmoy is not the target
    chains: [polygonAmoy], 
    ssr: true,
  }) as Config;
}

export const wagmiConfig = wagmiConfigValue;
