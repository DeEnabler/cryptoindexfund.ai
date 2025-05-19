
"use client";

import React, { createContext, useContext, useCallback, ReactNode, useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
// Conditional import for useConnectModal as it might not be available during SSR/build or if XellarKitProvider fails
let useConnectModalSdk: any = () => ({ open: () => console.warn("useConnectModal not initialized") });
try {
  if (typeof window !== 'undefined') { // Ensure this runs only on client
    useConnectModalSdk = require('@xellar/kit').useConnectModal;
  }
} catch (e) {
  console.warn("Could not load @xellar/kit useConnectModal dynamically", e);
}


interface AuthContextUser {
  address?: `0x${string}`;
}

interface AuthContextType {
  user: AuthContextUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isXellarDisabled: boolean;
  xellarSDKError: Error | null;
}

const XellarAuthContext = createContext<AuthContextType | undefined>(undefined);

const envDisableXellar = process.env.NEXT_PUBLIC_DISABLE_XELLAR_IN_DEV === 'true';

interface XellarAuthProviderProps {
  children: ReactNode;
  forceDisable?: boolean; // New prop to force disable state due to error
}

export const XellarAuthProvider: React.FC<XellarAuthProviderProps> = ({ children, forceDisable = false }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<AuthContextUser | null>(null);
  const [xellarSDKError, setXellarSDKError] = useState<Error | null>(null);
  
  const effectiveXellarDisabled = envDisableXellar || forceDisable || !!xellarSDKError;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { address, isConnected, isConnecting: isWagmiConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  
  let connectModalHook: { open: () => void } | null = null;
  if (!effectiveXellarDisabled && isMounted) {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      connectModalHook = useConnectModalSdk();
      if (typeof connectModalHook?.open !== 'function') { // дополнительная проверка
        throw new Error("useConnectModal().open is not a function");
      }
    } catch (error) {
      console.error("Failed to initialize or use Xellar connect modal hook:", error);
      if (!xellarSDKError) {
        // Use a microtask to defer state update if caught during render phase
        Promise.resolve().then(() => setXellarSDKError(error instanceof Error ? error : new Error('Xellar modal hook failed')));
      }
      connectModalHook = null; // Ensure it's null if hook failed
    }
  }
  
  useEffect(() => {
    if (isConnected && address) {
      setUser({ address });
    } else {
      setUser(null);
    }
  }, [isConnected, address]);

  const loginCallback = useCallback(() => {
    if (effectiveXellarDisabled) {
      alert("Wallet connection features are currently unavailable or disabled.");
      console.log("Login attempt while Xellar is disabled or in error state. Error: ", xellarSDKError);
      return;
    }
    if (!isMounted ) {
      alert("Wallet connection is initializing, please try again shortly.");
      console.log("Login attempt before component is fully mounted.");
      return;
    }
    if (!connectModalHook) {
        alert("Wallet connection features are currently unavailable (modal not ready).");
        console.error("Login attempt failed: connectModalHook is not available. Current error state:", xellarSDKError);
        if (!xellarSDKError) { // If no specific error yet, set a generic one
             Promise.resolve().then(() => setXellarSDKError(new Error('Xellar connect modal is not available.')));
        }
        return;
    }
    try {
        connectModalHook.open();
    } catch (error) {
        console.error("Error opening connect modal:", error);
        alert("Could not open wallet connection modal.");
        if (!xellarSDKError) {
            Promise.resolve().then(() => setXellarSDKError(error instanceof Error ? error : new Error('Failed to open connect modal')));
        }
    }
  }, [isMounted, connectModalHook, effectiveXellarDisabled, xellarSDKError]);

  const logoutCallback = useCallback(() => {
    if (effectiveXellarDisabled) {
      console.log("Logout attempt while Xellar is disabled or in error state.");
      return;
    }
    if (isConnected) {
      disconnect();
    }
  }, [isConnected, disconnect, effectiveXellarDisabled]);
  
  const isLoadingUI = isWagmiConnecting || (!isMounted && !effectiveXellarDisabled && !xellarSDKError);
  const isAuthenticatedUI = isConnected && !!user && !effectiveXellarDisabled && !xellarSDKError;

  const authContextValue: AuthContextType = {
    user,
    isLoading: isLoadingUI,
    isAuthenticated: isAuthenticatedUI,
    login: loginCallback,
    logout: logoutCallback,
    isXellarDisabled: effectiveXellarDisabled,
    xellarSDKError,
  };

  return (
    <XellarAuthContext.Provider value={authContextValue}>
      {children}
    </XellarAuthContext.Provider>
  );
};

export const useXellarAuth = (): AuthContextType => {
  const context = useContext(XellarAuthContext);
  if (context === undefined) {
    // This error should ideally not happen if AppProviders is set up correctly
    console.error("useXellarAuth must be used within a XellarAuthProvider. Context is undefined.");
    // Return a default 'disabled' state to prevent app crash if possible, though this indicates a setup issue.
    return {
      user: null,
      isLoading: false,
      isAuthenticated: false,
      login: () => alert("Auth context not available."),
      logout: () => {},
      isXellarDisabled: true,
      xellarSDKError: new Error("XellarAuthProvider not found in component tree.")
    };
  }
  return context;
};
