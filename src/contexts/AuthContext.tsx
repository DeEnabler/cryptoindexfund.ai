
"use client";

import React, { createContext, useContext, useCallback, ReactNode, useEffect, useState } from 'react';
import { useAccount, useDisconnect, useConnect, type Connector } from 'wagmi';
import { appKitModal } from '../../context'; // Import appKitModal

interface AuthContextUser {
  address?: `0x${string}`;
}

interface AuthContextType {
  user: AuthContextUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void; // login will now primarily use appKitModal.open()
  logout: () => void;
  connectors: readonly Connector[]; 
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextUser | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const { address, isConnected, isConnecting: isWagmiConnecting, status } = useAccount();
  const { disconnect } = useDisconnect();
  // useConnect is still useful to get the list of available connectors for fallbacks or other UI.
  const { connectors, error: connectError, isPending: isConnectPending, connect } = useConnect();
  
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
      console.error("Wagmi Connect Error (possibly from Reown AppKit interactions):", connectError);
      setAuthError(connectError);
    } else if (isMounted) {
      setAuthError(null);
    }
  }, [isMounted, connectError]);

  const loginCallback = useCallback(() => {
    if (!isMounted) {
      console.warn("Login attempt before AuthProvider is fully mounted on client.");
      return;
    }
    // Use Reown AppKit's modal open function
    if (appKitModal && typeof appKitModal.open === 'function') {
      appKitModal.open();
    } else {
      console.error("Reown AppKit modal is not available or 'open' is not a function. Trying Wagmi connect fallback.");
      // Fallback if appKitModal.open is not available
      if (connectors.length > 0) {
        connect({ connector: connectors[0] }); // Attempt to connect with the first available Wagmi connector
      } else {
        alert("No wallet connectors found. Please ensure Reown AppKit is configured correctly or a wallet is available.");
      }
    }
  }, [isMounted, connect, connectors]); // connect and connectors are dependencies for the fallback

  const logoutCallback = useCallback(() => {
    if (isMounted && isConnected) {
      disconnect();
      // Optionally, if Reown AppKit has its own logout/disconnect for its modal state:
      // if (appKitModal && typeof appKitModal.close === 'function') {
      //   appKitModal.close(); // Or a similar method
      // }
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

    