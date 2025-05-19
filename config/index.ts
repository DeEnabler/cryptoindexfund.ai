// config/index.ts
import { cookieStorage, createStorage } from '@wagmi/core';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, arbitrum, polygonAmoy } from '@reown/appkit/networks'; // Added polygonAmoy for consistency with previous setups

// Get projectId from environment variables
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;

if (!projectId) {
  throw new Error('NEXT_PUBLIC_REOWN_PROJECT_ID is not defined in environment variables');
}

// Define the networks your app supports
// Adjust this list as needed, e.g., [polygonAmoy] or [mainnet, polygonAmoy]
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
