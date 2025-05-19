
"use client";

import { type Config } from 'wagmi';
import { QueryClient } from '@tanstack/react-query';
// Import defaultConfig from @xellar/kit
import { defaultConfig } from '@xellar/kit';
import { polygonAmoy } from 'viem/chains'; // Using polygonAmoy as per Xellar's example

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const xellarAppId = process.env.NEXT_PUBLIC_XELLAR_PROJECT_ID;
const disableXellarInDev = process.env.NEXT_PUBLIC_DISABLE_XELLAR_IN_DEV === 'true';

// Determine Xellar environment
// For Vercel production/preview, use "production". For local dev, can use "sandbox" or based on an env var.
// We'll default to "production" if not explicitly set for local dev.
const xellarEnvironment = process.env.NEXT_PUBLIC_XELLAR_ENV || (process.env.NODE_ENV === 'development' ? 'sandbox' : 'production');

console.log("[Xellar Config] WalletConnect Project ID being used:", walletConnectProjectId);
console.log("[Xellar Config] Xellar Project ID being used:", xellarAppId);
console.log("[Xellar Config] Disable Xellar in Dev:", disableXellarInDev);
console.log("[Xellar Config] Xellar Environment being used for defaultConfig:", xellarEnvironment);


let wagmiConfigValue: Config;

if (disableXellarInDev && typeof window === 'undefined') { // Only apply basic config if disabled AND during SSR/build
  // Basic non-Xellar Wagmi config for when Xellar is disabled server-side
  // This is a minimal config to prevent build errors if Xellar SDK has issues.
  // For actual client-side usage when disabled, XellarAuthProvider provides mocks.
  const { createConfig, http } = require('wagmi'); // Use require for conditional import
  const { mainnet } = require('viem/chains');
  wagmiConfigValue = createConfig({
    chains: [mainnet], // Placeholder chain
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
  if (!xellarAppId) {
    console.error(
      '[Xellar Config] CRITICAL: NEXT_PUBLIC_XELLAR_PROJECT_ID is not set. Xellar features will likely not work.'
    );
  }

  // Using defaultConfig from @xellar/kit as per their documentation
  wagmiConfigValue = defaultConfig({
    appName: 'CryptoIndexFund', // Your app's name
    walletConnectProjectId: walletConnectProjectId!,
    xellarAppId: xellarAppId!,
    xellarEnv: xellarEnvironment, // Use the determined environment
    chains: [polygonAmoy], // Specify the chains you want to support
    ssr: true, // Important for Next.js App Router
  }) as Config;
}

export const wagmiConfig = wagmiConfigValue;
