import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { router } from 'expo-router';
import { loginUser, signupUser, LoginCredentials, SignupCredentials, AuthResponse } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Type definition for the authentication context
 * Defines the shape of the context object and available methods
 */
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: AuthResponse['user'] | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
};

// Create the context with undefined as initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys for persistent data
const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

/**
 * AuthProvider Component
 * 
 * Provides authentication state and methods to the app
 * Wraps the app to make auth context available to all child components
 * 
 * @param children - Child components that will have access to the auth context
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);

  /**
   * Initialize auth state from storage
   */
  const initializeAuth = async () => {
    try {
      const [token, userData] = await Promise.all([
        AsyncStorage.getItem(AUTH_TOKEN_KEY),
        AsyncStorage.getItem(USER_DATA_KEY),
      ]);

      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  };

  // Initialize auth state when component mounts
  useEffect(() => {
    initializeAuth();
  }, []);

  /**
   * Login handler
   * Authenticates user with API and stores token
   */
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser(credentials);

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.token && response.user) {
        await Promise.all([
          AsyncStorage.setItem(AUTH_TOKEN_KEY, response.token),
          AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(response.user)),
        ]);

        setUser(response.user);
        setIsAuthenticated(true);
        router.replace('/(tabs)');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Signup handler
   * Registers new user with API and logs them in
   */
  const signup = async (credentials: SignupCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signupUser(credentials);

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.token && response.user) {
        await Promise.all([
          AsyncStorage.setItem(AUTH_TOKEN_KEY, response.token),
          AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(response.user)),
        ]);

        setUser(response.user);
        setIsAuthenticated(true);
        router.replace('/(tabs)');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout handler
   * Clears auth state and storage
   */
  const logout = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(AUTH_TOKEN_KEY),
        AsyncStorage.removeItem(USER_DATA_KEY),
      ]);

      setUser(null);
      setIsAuthenticated(false);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        isLoading, 
        error, 
        user, 
        login, 
        signup, 
        logout 
      }}
    >
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