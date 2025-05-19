// config/index.ts
'use client'; // Ensure this runs client-side where NEXT_PUBLIC_ vars are available

import { cookieStorage, createStorage } from '@wagmi/core';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, arbitrum, polygonAmoy } from '@reown/appkit/networks'; // Added polygonAmoy for consistency

// Get projectId from environment variables
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;

if (!projectId || projectId === 'undefined') {
  // This error will be thrown if the variable is not set in Vercel
  throw new Error('CRITICAL ERROR: NEXT_PUBLIC_REOWN_PROJECT_ID is not defined or is "undefined". Please set this environment variable in your Vercel project settings.');
}

// Define the networks your app supports - adjust as needed
// Example: [mainnet, polygonAmoy] or just [polygonAmoy]
export const networks = [mainnet, arbitrum, polygonAmoy]; 

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
});

export const config = wagmiAdapter.wagmiConfig;
