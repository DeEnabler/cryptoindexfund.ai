
"use client";

import React, { createContext, useContext, useCallback, ReactNode } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
// Import useConnectModal from @xellar/kit
import { useConnectModal } from '@xellar/kit';

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

const XellarAuthContext = createContext<AuthContextType | undefined>(undefined);

export const XellarAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { address, isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const connectModal = useConnectModal(); // From @xellar/kit

  const user: AuthContextUser | null = isConnected && address ? { address } : null;

  const loginCallback = useCallback(() => {
    if (!isConnected && connectModal) {
      connectModal.open(); // Trigger Xellar's connect modal
    } else if (isConnected) {
      console.log("Already connected with address:", address);
    } else {
      console.error("Xellar connect modal is not available. Ensure XellarKitProvider is set up correctly.");
      alert("Wallet connection system is currently unavailable. Please try again shortly.");
    }
  }, [isConnected, connectModal, address]);

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
