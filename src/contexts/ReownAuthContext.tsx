
"use client";

import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
// import { useConnectModal } from '@reown/appkit'; // This import is problematic as useConnectModal is not exported

interface AuthContextUser {
  address?: `0x${string}`;
}

interface AuthContextType {
  user: AuthContextUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const ReownAuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  // const { open: openConnectModal } = useConnectModal(); // useConnectModal is not available from @reown/appkit
  const { disconnect } = useDisconnect();

  const isLoadingState = isConnecting || isReconnecting;

  const loginCallback = useCallback(() => {
    // if (openConnectModal) {
    //   openConnectModal();
    // } else {
    //   console.error("Reown connect modal hook is not available or not correctly imported.");
    // }
    // TODO: Replace with the correct mechanism to open Reown's connection modal
    console.log("Login clicked. Need to implement Reown connection modal trigger.");
    alert("Connect wallet functionality needs to be updated with the correct Reown SDK usage. Please consult Reown documentation for opening the connection modal.");
  }, []);

  const logoutCallback = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const currentUser: AuthContextUser | null = isConnected && address ? { address } : null;

  return (
    <AuthContext.Provider value={{
      user: currentUser,
      isLoading: isLoadingState,
      isAuthenticated: isConnected,
      login: loginCallback,
      logout: logoutCallback
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useReownAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useReownAuth must be used within a ReownAuthProvider, which itself must be nested within AppKitProvider, WagmiProvider, and QueryClientProvider.');
  }
  return context;
};
