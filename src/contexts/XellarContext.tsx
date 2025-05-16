
"use client";

import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useCallback } from 'react';
// Removed wagmi and xellar/kit imports as the integration is temporarily disabled

interface AuthContextUser {
  address?: `0x${string}`;
  // Add other user properties if needed when re-integrating
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
  // Mocked values since Xellar integration is disabled
  const user: AuthContextUser | null = null;
  const isLoading = false;
  const isAuthenticated = false;

  const loginCallback = useCallback(() => {
    console.warn("Launch App clicked: Xellar Wallet connection is temporarily disabled.");
    alert("Wallet connection functionality is temporarily disabled pending domain setup. This feature will be re-enabled later.");
  }, []);

  const logoutCallback = useCallback(() => {
    console.warn("Logout clicked: No active session as Xellar integration is disabled.");
    // Potentially clear any local app state if needed, though not much to clear with a mock setup.
  }, []);

  return (
    <XellarAuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated,
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
    // This error indicates a programming mistake – XellarAuthProvider is missing in the tree.
    // AppProviders component should ensure XellarAuthProvider always wraps its children.
    console.error('useXellarAuth must be used within a XellarAuthProvider.');
    // Return a default state to prevent crashes if accessed incorrectly, though this shouldn't happen with proper provider setup.
    return {
        user: null,
        isLoading: false,
        isAuthenticated: false,
        login: () => alert("Authentication system not properly initialized."),
        logout: () => {}
    };
  }
  return context;
};
