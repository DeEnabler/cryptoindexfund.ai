
"use client";

import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
// Assuming useConnectModal is from @xellar/kit
import { useConnectModal } from '@xellar/kit';

interface AuthContextUser {
  address?: `0x${string}`;
  // Add other user properties from Xellar if needed (e.g., email for embedded wallets)
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
  const { open: openConnectModal } = useConnectModal(); // This line might error if useConnectModal isn't in @xellar/kit or used differently
  const { disconnect } = useDisconnect();

  const isLoadingState = isConnecting || isReconnecting;

  const loginCallback = useCallback(() => {
    if (openConnectModal) {
      openConnectModal();
    } else {
      console.error("Xellar connect modal hook (useConnectModal) is not available or not correctly imported from @xellar/kit. Consult Xellar documentation.");
      alert("Connect wallet functionality needs to be updated with the correct Xellar SDK usage.");
    }
  }, [openConnectModal]);

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
