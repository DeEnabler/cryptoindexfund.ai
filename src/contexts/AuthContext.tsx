
"use client";

import React, { createContext, useContext, useCallback, ReactNode, useEffect, useState } from 'react';
import { useAccount, useDisconnect, useConnect, type Connector } from 'wagmi';

interface AuthContextUser {
  address?: `0x${string}`;
}

interface AuthContextType {
  user: AuthContextUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (connector?: Connector) => void;
  logout: () => void;
  connectors: readonly Connector[];
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextUser | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Wagmi hooks should only be called when isMounted is true to avoid SSR issues if they are not fully SSR safe
  // or if their behavior depends on client-side environment.
  const { address, isConnected, isConnecting: isWagmiConnecting, status } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors, error: connectError, isPending: isConnectPending } = useConnect();
  
  const [authError, setAuthError] = useState<Error | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && isConnected && address) {
      setUser({ address });
    } else if (isMounted && !isConnected) {
      setUser(null);
    }
  }, [isMounted, isConnected, address]);

  useEffect(() => {
    if (isMounted && connectError) {
      console.error("Wagmi Connect Error:", connectError);
      setAuthError(connectError);
    } else if (isMounted) {
      setAuthError(null);
    }
  }, [isMounted, connectError]);

  const loginCallback = useCallback((connectorInstance?: Connector) => {
    if (!isMounted) {
      console.warn("Login attempt before AuthProvider is fully mounted on client.");
      // Potentially show a toast or alert, or simply disallow if critical
      return;
    }
    if (connectorInstance) {
      connect({ connector: connectorInstance });
    } else if (connectors.length > 0) {
      connect({ connector: connectors[0] }); // Attempt with the first available connector
    } else {
      console.warn("No wallet connectors available to login.");
      alert("No wallet connectors found. Please ensure you have a Web3 wallet (like MetaMask) installed or try a different browser/device.");
    }
  }, [isMounted, connect, connectors]);

  const logoutCallback = useCallback(() => {
    if (isMounted && isConnected) {
      disconnect();
    }
  }, [isMounted, isConnected, disconnect]);

  // isLoading should be true if not mounted yet, or if wagmi is connecting/pending
  const isLoadingAuth = !isMounted || isWagmiConnecting || isConnectPending;
  // isAuthenticated should only be true if mounted and wagmi reports connected status
  const isAuthenticatedAuth = isMounted && isConnected && !!user && status === 'connected';

  const authContextValue: AuthContextType = {
    user,
    isLoading: isLoadingAuth,
    isAuthenticated: isAuthenticatedAuth,
    login: loginCallback,
    logout: logoutCallback,
    connectors: isMounted ? connectors : [], // Provide empty array if not mounted
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
      isLoading: true, // Assume loading if context is missing
      isAuthenticated: false,
      login: () => alert("Auth context not available. Ensure AppProviders is set up correctly."),
      logout: () => {},
      connectors: [],
      error: new Error("AuthProvider not found in component tree."),
    };
  }
  return context;
};
