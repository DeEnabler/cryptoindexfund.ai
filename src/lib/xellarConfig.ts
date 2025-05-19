
"use client";

import type { Config } from 'wagmi';
import { createConfig, http } from 'wagmi'; // For basic Wagmi config
import { defaultConfig as xellarDefaultWagmiConfig } from '@xellar/kit'; // Aliased for clarity
import { mainnet, polygonAmoy } from 'viem/chains';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const xellarAppId = process.env.NEXT_PUBLIC_XELLAR_PROJECT_ID;
const disableXellarInDev = process.env.NEXT_PUBLIC_DISABLE_XELLAR_IN_DEV === 'true';

console.log("[Xellar Config] WalletConnect Project ID being used:", walletConnectProjectId);
console.log("[Xellar Config] Xellar Project ID being used:", xellarAppId);
console.log("[Xellar Config] Disable Xellar in Dev:", disableXellarInDev);

let wagmiConfigValue: Config;

if (disableXellarInDev) {
  // Basic non-Xellar Wagmi config for when Xellar is explicitly disabled
  wagmiConfigValue = createConfig({
    chains: [mainnet, polygonAmoy], // Using polygonAmoy as it's used in Xellar config too
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
  if (!xellarAppId) {
    console.error(
      '[Xellar Config] CRITICAL: NEXT_PUBLIC_XELLAR_PROJECT_ID is not set. Xellar features will likely not work.'
    );
  }

  wagmiConfigValue = xellarDefaultWagmiConfig({
    appName: 'CryptoIndexFund', // Your app's name
    walletConnectProjectId: walletConnectProjectId!, 
    xellarAppId: xellarAppId!, 
    xellarEnv: "sandbox", // As per Xellar's example for the new App ID
    chains: [polygonAmoy],
    ssr: true,
  }) as Config;
}

export const wagmiConfig = wagmiConfigValue;
