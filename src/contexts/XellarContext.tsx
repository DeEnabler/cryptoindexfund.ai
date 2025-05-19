
"use client";

import React, { createContext, useContext, useCallback, ReactNode, useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
// Import useConnectModal from @xellar/kit - this will be conditionally used
import { useConnectModal } from '@xellar/kit';

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
  if (disableXellarInDev) {
    // Provide mock implementation if Xellar is disabled
    const mockAuthContext: AuthContextType = {
      user: null,
      isLoading: false,
      isAuthenticated: false,
      login: () => {
        alert("Wallet connection is disabled in this development environment. Please configure NEXT_PUBLIC_DISABLE_XELLAR_IN_DEV=false and ensure Xellar/WalletConnect is set up for production/live testing.");
        console.log("Mock login called: Xellar SDK is disabled for this environment.");
      },
      logout: () => {
        console.log("Mock logout called: Xellar SDK is disabled for this environment.");
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { address, isConnected, isConnecting } = useAccount();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { disconnect } = useDisconnect();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const connectModalHook = useConnectModal();

  const user: AuthContextUser | null = isConnected && address ? { address } : null;

  const loginCallback = useCallback(() => {
    if (!isConnected && connectModalHook) {
      connectModalHook.open();
    } else if (isConnected) {
      console.log("Already connected with address:", address);
    } else {
      console.error("Xellar connect modal hook is not available. Ensure XellarKitProvider is set up correctly.");
      alert("Wallet connection system is currently unavailable. Please try again shortly.");
    }
  }, [isConnected, connectModalHook, address]);

  const logoutCallback = useCallback(() => {
    if (isConnected) {
      disconnect();
    }
  }, [isConnected, disconnect]);

  return (
    <XellarAuthContext.Provider
      value={{
        user,
        isLoading: isConnecting,
        isAuthenticated: isConnected,
        login: loginCallback,
        logout: logoutCallback,
        isXellarDisabled: false,
      }}
    >
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
