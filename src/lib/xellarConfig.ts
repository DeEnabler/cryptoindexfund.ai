
// "use client";

// import type { Config } from 'wagmi';
// import { createConfig, http } from 'wagmi'; // Keep createConfig if used directly
// import { QueryClient } from '@tanstack/react-query';
// // Import defaultConfig from @xellar/kit (or the correct Xellar package)
// import { defaultConfig } from '@xellar/kit';
// import { polygonAmoy } from 'viem/chains'; // Example chain

// // export const queryClient = new QueryClient();

// // const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
// // const xellarAppId = process.env.NEXT_PUBLIC_XELLAR_PROJECT_ID;

// // // For debugging: Log the values being used
// // console.log("[Xellar Config] WalletConnect Project ID being used:", walletConnectProjectId);
// // console.log("[Xellar Config] Xellar Project ID being used:", xellarAppId);

// // if (!walletConnectProjectId) {
// //   console.warn("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect functionality may be impaired. Get ID from https://cloud.walletconnect.com/");
// // }
// // if (!xellarAppId) {
// //   console.error("CRITICAL: NEXT_PUBLIC_XELLAR_PROJECT_ID is not set in .env file. Xellar Kit features will likely not work.");
// // }

// // Use defaultConfig from @xellar/kit
// // export const wagmiConfig = defaultConfig({
// //   appName: "TrustVest",
// //   walletConnectProjectId: walletConnectProjectId!,
// //   xellarAppId: xellarAppId!,
// //   xellarEnv: "sandbox", // Or "production", verify with Xellar docs
// //   chains: [polygonAmoy],
// //   ssr: true, // For Next.js App Router
// // }) as Config;

// // Fallback minimal config if Xellar's defaultConfig is problematic or for disabling
// // export const wagmiConfig = createConfig({
// //   chains: [polygonAmoy],
// //   transports: {
// //     [polygonAmoy.id]: http(),
// //   },
// // });
