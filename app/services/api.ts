/**
 * API Service
 * 
 * Handles all API communication with the backend server.
 * Includes authentication-related API calls and response handling.
 */

// TODO: Replace with your actual API base URL
const API_BASE_URL = 'https://api.fittlens.com';

/**
 * Types for API requests and responses
 */
export interface LoginCredentials {
  email: string;  // Changed from username to email to match API
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;  // Added name field
  deviceId?: string;  // Optional device ID
  confirmPassword: string;
}

export interface User {
  uuid: string;
  name: string;
  deviceId: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  error?: string;
}

/**
 * Handles user login
 * @param credentials - User login credentials
 * @returns AuthResponse containing user data and token
 */
export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Return in consistent format for both login and signup
    return {
      token: data.token,
      user: {
        uuid: data.uuid,
        name: data.name,
        deviceId: data.deviceId,
        email: data.email,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      error: error instanceof Error ? error.message : 'An unknown error occurred',
      token: '',
      user: {
        uuid: '',
        name: '',
        deviceId: '',
        email: '',
      },
    };
  }
}

/**
 * Handles user registration
 * @param credentials - User signup credentials
 * @returns AuthResponse containing user data and token
 */
export async function signupUser(credentials: SignupCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
        deviceId: credentials.deviceId || 'default-device',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }

    // The signup response already matches our expected format
    return {
      token: data.token,
      user: {
        uuid: data.uuid,
        name: data.name,
        deviceId: data.deviceId,
        email: data.email,
      },
    };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      error: error instanceof Error ? error.message : 'An unknown error occurred',
      token: '',
      user: {
        uuid: '',
        name: '',
        deviceId: '',
        email: '',
      },
    };
  }
} 