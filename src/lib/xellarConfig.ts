
"use client";

import { type Config } from 'wagmi';
import { QueryClient } from '@tanstack/react-query';
// Import defaultConfig from @xellar/kit
import { defaultConfig } from '@xellar/kit';
import { polygonAmoy } from 'viem/chains';

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
  console.log("[Xellar Config] Xellar SDK disabled for this development environment. Using basic Wagmi config.");
  // Basic non-Xellar Wagmi config for when Xellar is disabled
  const { createConfig, http } = await import('wagmi');
  const { mainnet } = await import('viem/chains'); // Using mainnet as a generic placeholder
  wagmiConfigValue = createConfig({
    chains: [mainnet],
    transports: {
      [mainnet.id]: http(),
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

  wagmiConfigValue = defaultConfig({
    appName: 'CryptoIndexFund',
    walletConnectProjectId: walletConnectProjectId!, 
    xellarAppId: xellarProjectId!,
    xellarEnv: "production", // Changed from "sandbox" to "production"
    chains: [polygonAmoy], 
    ssr: true, 
  }) as Config; 
}

export const wagmiConfig = wagmiConfigValue;
