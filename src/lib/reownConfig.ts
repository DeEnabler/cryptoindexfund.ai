
"use client";

import { QueryClient } from '@tanstack/react-query';
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, bsc, polygon } from 'wagmi/chains';
// Attempt to import authConnector based on previous error hints
// The exact name and usage need to be verified from Reown documentation
import { authConnector } from '@reown/appkit-adapter-wagmi'; // Placeholder import

export const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const reownAppId = process.env.NEXT_PUBLIC_REOWN_APP_ID;

// For debugging: Log the values being used
console.log("[Reown Config] WalletConnect Project ID being used:", walletConnectProjectId);
console.log("[Reown Config] Reown App ID being used:", reownAppId);

if (!walletConnectProjectId) {
  console.warn("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect functionality may be impaired. Get ID from https://cloud.walletconnect.com/");
}
if (!reownAppId) {
  console.error("CRITICAL: NEXT_PUBLIC_REOWN_APP_ID is not set in .env file. Reown AppKit features will likely not work.");
}

// Placeholder for Reown connectors.
// You MUST consult Reown documentation for how to correctly initialize and use authConnector
// and any other connectors they provide.
// It might be a function call: e.g., authConnector({ appId: reownAppId, walletConnectProjectId })
// Or it might be an array of connector instances.
// Example:
// const connectors = [
//   authConnector({
//     appId: reownAppId!,
//     walletConnectProjectId: walletConnectProjectId!,
//     // Other options as required by Reown's authConnector
//   }),
//   // Potentially other connectors like injected(), coinbaseWallet(), etc., if not handled by authConnector
// ];

// For now, initializing with an empty connectors array or a basic setup if authConnector is simple.
// This part is HIGHLY LIKELY to need adjustment based on Reown's specific API for authConnector.
// If authConnector is a pre-configured instance, it might be used directly.
// If authConnector itself is an array of connectors, it could be spread: [...authConnector]
// Most likely, authConnector is a function that returns a connector instance.

let reownConnectors: any[] = [];

if (reownAppId && walletConnectProjectId) {
    // This is a common pattern, but the actual API for authConnector from Reown is unknown.
    // You MUST replace this with the correct way to initialize Reown's connector(s).
    // For example, if authConnector is a function that needs these params:
    // reownConnectors = [
    //   authConnector({ appId: reownAppId, walletConnectProjectId })
    // ];
    // Or, if authConnector is an array:
    // reownConnectors = authConnector;
    // Or, if it's a single connector instance:
    // reownConnectors = [authConnector];
    
    // As a placeholder, assuming authConnector might be a function needing config.
    // THIS IS A GUESS AND NEEDS VERIFICATION WITH REOWN DOCS.
    try {
      // const configuredAuthConnector = authConnector({ options: { projectId: walletConnectProjectId, metadata: { name: 'TrustVest' } } });
      // reownConnectors = [configuredAuthConnector];
      // console.log('[Reown Config] Attempting to use authConnector.');
      // For now, leave connectors empty until the correct usage of authConnector is known.
      // This will likely cause issues until correctly configured.
       console.warn("[Reown Config] Connectors array is likely not configured correctly. `authConnector` usage needs to be verified with Reown documentation.");
    } catch (e) {
      console.error("[Reown Config] Error trying to use/configure authConnector:", e);
    }
}


export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, bsc, polygon],
  connectors: reownConnectors, // This will likely need to be populated correctly using authConnector
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
  },
  ssr: true, // Ensure this is compatible with Reown's connectors and your app structure
});
