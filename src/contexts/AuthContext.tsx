
"use client";

import React, { createContext, useContext, useCallback, ReactNode, useEffect, useState } from 'react';
import { useAccount, useDisconnect, useConnect, type Connector } from 'wagmi';
// Reown AppKit might provide its own modal trigger, or Wagmi's connect() might work with their adapter.
// For now, we'll keep the Wagmi useConnect. If Reown has a specific hook to open its modal (e.g., from appKitModal exported from context/index.tsx),
// that would be used here instead or in conjunction.

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
  error: Error | null; // For Wagmi connection errors
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextUser | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Wagmi hooks
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
      return;
    }

    // Standard Wagmi connect flow. Reown's WagmiAdapter should make its connection method available via wagmi's `connectors`.
    // Or, Reown AppKit might offer a specific hook/function to open its modal, e.g. `appKitModal.open()`
    // if `appKitModal` from `context/index.tsx` were made available here.
    // For now, this will try to use Wagmi's standard connect which Reown's adapter plugs into.
    if (connectorInstance) {
      connect({ connector: connectorInstance });
    } else if (connectors.length > 0) {
      // Typically, Reown AppKit provides its own button/modal that handles connector selection.
      // If we want to programmatically open, we might need to call a Reown specific function.
      // This is a fallback to try the first available Wagmi connector.
      console.log("Attempting to connect with first available Wagmi connector. Reown AppKit might have its own modal trigger.");
      connect({ connector: connectors[0] }); 
    } else {
      console.warn("No wallet connectors available to login via Wagmi.");
      alert("No wallet connectors found. Please ensure you have a Web3 wallet (like MetaMask) installed or try a different browser/device.");
    }
  }, [isMounted, connect, connectors]);

  const logoutCallback = useCallback(() => {
    if (isMounted && isConnected) {
      disconnect();
    }
  }, [isMounted, isConnected, disconnect]);

  const isLoadingAuth = !isMounted || isWagmiConnecting || isConnectPending;
  const isAuthenticatedAuth = isMounted && isConnected && !!user && status === 'connected';

  const authContextValue: AuthContextType = {
    user,
    isLoading: isLoadingAuth,
    isAuthenticated: isAuthenticatedAuth,
    login: loginCallback,
    logout: logoutCallback,
    connectors: isMounted ? connectors : [],
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
    return {
      user: null,
      isLoading: true,
      isAuthenticated: false,
      login: () => alert("Auth context not available. Ensure ContextProvider from Reown setup is correctly wrapping your app."),
      logout: () => {},
      connectors: [],
      error: new Error("AuthProvider not found in component tree."),
    };
  }
  return context;
};
