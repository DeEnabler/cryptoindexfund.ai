
"use client";

import React, { createContext, useContext, useCallback, ReactNode, useEffect, useState } from 'react';
import { useAccount, useDisconnect, useConnect } from 'wagmi';
import type { Connector } from 'wagmi';

interface AuthContextUser {
  address?: `0x${string}`;
}

interface AuthContextType {
  user: AuthContextUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (connector?: Connector) => void; // Allow specifying a connector
  logout: () => void;
  connectors: readonly Connector[];
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextUser | null>(null);
  const { address, isConnected, isConnecting: isWagmiConnecting, status } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors, error: connectError, isPending: isConnectPending } = useConnect();
  const [authError, setAuthError] = useState<Error | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      setUser({ address });
    } else {
      setUser(null);
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (connectError) {
      console.error("Wagmi Connect Error:", connectError);
      setAuthError(connectError);
    } else {
      setAuthError(null);
    }
  }, [connectError]);

  const loginCallback = useCallback((connector?: Connector) => {
    if (connector) {
      connect({ connector });
    } else if (connectors.length > 0) {
      // For simplicity, try the first available connector if none specified.
      // A better UX would involve a modal to select a connector.
      console.log("Attempting to connect with first available connector:", connectors[0].name);
      connect({ connector: connectors[0] });
    } else {
      console.warn("No connectors available to login.");
      alert("No wallet connectors found. Please ensure you have a Web3 wallet installed or try a different browser.");
    }
  }, [connect, connectors]);

  const logoutCallback = useCallback(() => {
    if (isConnected) {
      disconnect();
    }
  }, [isConnected, disconnect]);

  const isLoadingAuth = isWagmiConnecting || isConnectPending;
  const isAuthenticatedAuth = isConnected && !!user && status === 'connected';

  const authContextValue: AuthContextType = {
    user,
    isLoading: isLoadingAuth,
    isAuthenticated: isAuthenticatedAuth,
    login: loginCallback,
    logout: logoutCallback,
    connectors,
    error: authError,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.error("useAuth must be used within an AuthProvider. Context is undefined.");
    // Return a default "safe" state to prevent crashes if used outside provider
    return {
      user: null,
      isLoading: false,
      isAuthenticated: false,
      login: () => alert("Auth context not available."),
      logout: () => {},
      connectors: [],
      error: new Error("AuthProvider not found in component tree."),
    };
  }
  return context;
};
