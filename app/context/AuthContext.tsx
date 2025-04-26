import { createContext, useContext, useState, ReactNode } from 'react';
import { router } from 'expo-router';

/**
 * Type definition for the authentication context
 * Defines the shape of the context object and available methods
 */
type AuthContextType = {
  isAuthenticated: boolean;  // Current authentication state
  login: () => void;        // Function to handle login
  logout: () => void;       // Function to handle logout
};

// Create the context with undefined as initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider Component
 * 
 * Provides authentication state and methods to the app
 * Wraps the app to make auth context available to all child components
 * 
 * @param children - Child components that will have access to the auth context
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  // Track authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Login handler
   * Sets authentication state to true and redirects to main app
   */
  const login = () => {
    setIsAuthenticated(true);
    router.replace('/(tabs)');
  };

  /**
   * Logout handler
   * Sets authentication state to false and redirects to login
   */
  const logout = () => {
    setIsAuthenticated(false);
    router.replace('/(auth)/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use the auth context
 * 
 * Provides easy access to authentication state and methods
 * Throws an error if used outside of AuthProvider
 * 
 * @returns AuthContextType object containing auth state and methods
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 