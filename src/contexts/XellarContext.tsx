
"use client";

import React, { createContext, useContext, useCallback, ReactNode, useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
// Import useConnectModal from @xellar/kit, aliased to avoid potential conflicts
import { useConnectModal as useXellarKitConnectModal } from '@xellar/kit'; 

interface AuthContextUser {
  address?: `0x${string}`;
  // Add other user properties if Xellar provides them (e.g., email, profile info)
}

interface AuthContextType {
  user: AuthContextUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isXellarDisabled: boolean;
}

const XellarAuthContext = createContext<AuthContextType | undefined>(undefined);

const disableXellarInDev = process.env.NEXT_PUBLIC_DISABLE_XELLAR_IN_DEV === 'true';

export const XellarAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<AuthContextUser | null>(null);
  // isLoadingSDK indicates if client-side hooks (like useXellarKitConnectModal) are ready
  // It's true initially if Xellar is enabled, and set to false once mounted
  const [isLoadingSDK, setIsLoadingSDK] = useState(!disableXellarInDev); 

  useEffect(() => {
    setIsMounted(true);
    if (!disableXellarInDev) {
      setIsLoadingSDK(false); // SDK considered "ready" (for calling hooks) once mounted
    } else {
      setIsLoadingSDK(false); // If disabled, SDK is also not "loading"
    }
  }, []);

  if (disableXellarInDev) {
    // Provide mock implementation if Xellar is disabled
    const mockAuthContext: AuthContextType = {
      user: null,
      isLoading: false, // Not loading if disabled
      isAuthenticated: false,
      login: () => {
        alert("Wallet connection is disabled in this development environment.");
        console.log("Mock login called: Xellar SDK is disabled.");
      },
      logout: () => {
        console.log("Mock logout called: Xellar SDK is disabled.");
      },
      isXellarDisabled: true,
    };
    return (
      <XellarAuthContext.Provider value={mockAuthContext}>
        {children}
      </XellarAuthContext.Provider>
    );
  }

  // Original provider logic when Xellar is enabled
  // These Wagmi hooks should be safe as WagmiProvider is always an ancestor
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { address, isConnected, isConnecting: isWagmiConnecting } = useAccount();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { disconnect } = useDisconnect();
  
  // Xellar's useConnectModal hook - only call if mounted and Xellar is enabled
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const xellarConnectModalHook = isMounted ? useXellarKitConnectModal() : null;

  useEffect(() => {
    if (isConnected && address) {
      setUser({ address });
    } else {
      setUser(null);
    }
  }, [isConnected, address]);

  const loginCallback = useCallback(() => {
    if (!isMounted || !xellarConnectModalHook) {
      console.log("Login attempted before Xellar SDK (connect modal) is ready or available.");
      alert("Wallet connection is initializing, please try again shortly.");
      return;
    }
    xellarConnectModalHook.open();
  }, [isMounted, xellarConnectModalHook]);

  const logoutCallback = useCallback(() => {
    if (isConnected) {
      disconnect();
    }
  }, [isConnected, disconnect]);

  const authContextValue: AuthContextType = {
    user,
    isLoading: isWagmiConnecting || isLoadingSDK, // isLoadingSDK primarily covers the "not yet mounted" state for Xellar's hook
    isAuthenticated: isConnected && !!user,
    login: loginCallback,
    logout: logoutCallback,
    isXellarDisabled: false,
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
    throw new Error('useXellarAuth must be used within a XellarAuthProvider');
  }
  return context;
};
