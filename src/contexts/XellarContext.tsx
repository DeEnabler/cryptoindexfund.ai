
"use client";

import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
// Import useConnectModal from @xellar/kit
import { useConnectModal } from '@xellar/kit';

interface AuthContextUser {
  address?: `0x${string}`;
  // Add other user properties from Xellar if needed
}

interface AuthContextType {
  user: AuthContextUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const XellarAuthContext = createContext<AuthContextType | undefined>(undefined);

export const XellarAuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const connectModal = useConnectModal(); // Get the connectModal object
  const { disconnect } = useDisconnect();

  const isLoadingState = isConnecting || isReconnecting;

  const loginCallback = useCallback(() => {
    if (connectModal?.open) {
      connectModal.open(); // Call open method on the connectModal object
    } else {
      console.error("Xellar connect modal hook (useConnectModal) is not available or not correctly imported/initialized from @xellar/kit. Consult Xellar documentation.");
      // Fallback alert or other UI indication if needed
      alert("Connect wallet functionality is not available at the moment. Please ensure Xellar Kit is properly configured.");
    }
  }, [connectModal]);

  const logoutCallback = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const currentUser: AuthContextUser | null = isConnected && address ? { address } : null;

  return (
    <XellarAuthContext.Provider value={{
      user: currentUser,
      isLoading: isLoadingState,
      isAuthenticated: isConnected,
      login: loginCallback,
      logout: logoutCallback
    }}>
      {children}
    </XellarAuthContext.Provider>
  );
};

export const useXellarAuth = (): AuthContextType => {
  const context = useContext(XellarAuthContext);
  if (context === undefined) {
    throw new Error('useXellarAuth must be used within a XellarAuthProvider, which itself must be nested within WagmiProvider, QueryClientProvider, and XellarKitProvider.');
  }
  return context;
};
