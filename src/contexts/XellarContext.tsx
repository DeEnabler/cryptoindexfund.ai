
"use client";

import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
// Assuming useConnectModal is from @reown/appkit
import { useConnectModal } from '@reown/appkit'; 

// Consider renaming this context to ReownContext or AuthContext if Xellar is fully replaced
interface ReownContextUser { 
  address?: `0x${string}`;
}

interface ReownContextType {
  user: ReownContextUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const ReownContext = createContext<ReownContextType | undefined>(undefined);

export const XellarProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => { // Consider renaming XellarProvider
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
  
  const currentUser: ReownContextUser | null = isConnected && address ? { address } : null;

  return (
    <ReownContext.Provider value={{ 
      user: currentUser,
      isLoading: isLoadingState,
      isAuthenticated: isConnected,
      login: loginCallback,
      logout: logoutCallback
    }}>
      {children}
    </ReownContext.Provider>
  );
};

export const useXellar = (): ReownContextType => { // Consider renaming useXellar
  const context = useContext(ReownContext);
  if (context === undefined) {
    throw new Error('useXellar (useReown) must be used within a XellarProvider (ReownProvider), which itself must be nested within AppKitProvider, WagmiProvider, and QueryClientProvider.');
  }
  return context;
};
