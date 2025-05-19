
"use client";

import React, { createContext, useContext, useCallback, ReactNode, useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
// Import useConnectModal directly from @xellar/kit
import { useConnectModal as useXellarConnectModalHook } from '@xellar/kit';

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
  forceDisable?: boolean; 
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
  
  // Call the hook conditionally at the top level
  // It will only be truly active if !effectiveXellarDisabled and isMounted.
  // If these conditions are false, connectModal will be null or its 'open' might be a no-op if the hook handles this internally.
  const connectModal = (!effectiveXellarDisabled && isMounted) ? useXellarConnectModalHook() : null;

  useEffect(() => {
    if (forceDisable && !xellarSDKError) {
      setXellarSDKError(new Error("Xellar SDK features disabled due to an initialization error."));
    }
  }, [forceDisable, xellarSDKError]);
  
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
    if (!connectModal || typeof connectModal.open !== 'function') {
        alert("Wallet connection features are currently unavailable (modal not ready).");
        console.error("Login attempt failed: Xellar connectModal is not available. Current error state:", xellarSDKError);
        if (!xellarSDKError) { 
             Promise.resolve().then(() => setXellarSDKError(new Error('Xellar connect modal is not available.')));
        }
        return;
    }
    try {
        connectModal.open();
    } catch (error) {
        console.error("Error opening connect modal:", error);
        alert("Could not open wallet connection modal.");
        if (!xellarSDKError) {
            Promise.resolve().then(() => setXellarSDKError(error instanceof Error ? error : new Error('Failed to open connect modal')));
        }
    }
  }, [isMounted, connectModal, effectiveXellarDisabled, xellarSDKError]);

  const logoutCallback = useCallback(() => {
    if (effectiveXellarDisabled) {
      console.log("Logout attempt while Xellar is disabled or in error state.");
      return;
    }
    if (isConnected) {
      disconnect();
    }
  }, [isConnected, disconnect, effectiveXellarDisabled]);
  
  const isLoadingUI = isWagmiConnecting || (!isMounted && !effectiveXellarDisabled && !xellarSDKError && !forceDisable);
  const isAuthenticatedUI = isConnected && !!user && !effectiveXellarDisabled && !xellarSDKError && !forceDisable;

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
    console.error("useXellarAuth must be used within a XellarAuthProvider. Context is undefined.");
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
