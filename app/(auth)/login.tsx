import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * LoginScreen Component
 * 
 * Provides user authentication functionality with a form for email and password.
 * Uses the AuthContext to manage authentication state and navigation.
 * 
 * Features:
 * - Email input
 * - Password input with secure entry
 * - Login button with loading state
 * - Error message display
 * - Link to signup page
 */
export default function LoginScreen() {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Get authentication context
  const { login, isLoading, error } = useAuth();

  /**
   * Handle login button press
   * Validates input and calls login function
   */
  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }
    await login({ email, password });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Welcome Back!</Text>
      
      {/* Error Message */}
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      
      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#666673"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#666673"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoComplete="password"
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity 
        style={[styles.loginButton, (!email || !password) && styles.loginButtonDisabled]} 
        onPress={handleLogin}
        disabled={isLoading || !email || !password}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Sign Up Link */}
      <Link href="/(auth)/signup" asChild>
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

// Styles for the login screen components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#21212E',
    marginBottom: 40,
    fontFamily: 'Inter',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666673',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter',
  },
  loginButton: {
    backgroundColor: '#2178FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonDisabled: {
    backgroundColor: '#2178FA80',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  signupButton: {
    borderWidth: 2,
    borderColor: '#2178FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  signupButtonText: {
    color: '#2178FA',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
}); 