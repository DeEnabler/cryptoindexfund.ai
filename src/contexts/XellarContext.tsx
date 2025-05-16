
"use client";

import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useConnectModal } from '@xellar/kit';

interface XellarContextUser {
  address?: `0x${string}`;
  // Potentially other user properties from Xellar/Wagmi if needed
}

interface XellarContextType {
  user: XellarContextUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const XellarContext = createContext<XellarContextType | undefined>(undefined);

export const XellarProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const { open: openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();

  const isLoadingState = isConnecting || isReconnecting;

  const loginCallback = useCallback(() => {
    openConnectModal();
  }, [openConnectModal]);

  const logoutCallback = useCallback(() => {
    disconnect();
  }, [disconnect]);
  
  const currentUser: XellarContextUser | null = isConnected && address ? { address } : null;

  return (
    <XellarContext.Provider value={{ 
      user: currentUser,
      isLoading: isLoadingState,
      isAuthenticated: isConnected,
      login: loginCallback,
      logout: logoutCallback
    }}>
      {children}
    </XellarContext.Provider>
  );
};

export const useXellar = (): XellarContextType => {
  const context = useContext(XellarContext);
  if (context === undefined) {
    throw new Error('useXellar must be used within a XellarProvider, which itself must be nested within XellarKitProvider, WagmiProvider, and QueryClientProvider.');
  }
  return context;
};
