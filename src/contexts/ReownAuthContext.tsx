
"use client";

import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
// Assuming useConnectModal is from @reown/appkit
import { useConnectModal } from '@reown/appkit'; 

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
  const { open: openConnectModal } = useConnectModal(); // Hook from @reown/appkit
  const { disconnect } = useDisconnect();

  const isLoadingState = isConnecting || isReconnecting;

  const loginCallback = useCallback(() => {
    if (openConnectModal) {
      openConnectModal();
    } else {
      console.error("Reown connect modal is not available");
    }
  }, [openConnectModal]);

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
