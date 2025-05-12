import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * SignupScreen Component
 * 
 * Provides user registration functionality with a form for creating a new account.
 * Uses the AuthContext to manage authentication state and navigation.
 * 
 * Features:
 * - Name input
 * - Email input
 * - Password input with secure entry
 * - Password confirmation
 * - Sign up button with loading state
 * - Error message display
 * - Link back to login page
 */
export default function SignupScreen() {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Get authentication context
  const { signup, isLoading, error } = useAuth();

  /**
   * Handle signup button press
   * Validates input and calls signup function
   */
  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      return;
    }
    if (password !== confirmPassword) {
      // You might want to show this error in the UI
      console.error('Passwords do not match');
      return;
    }
    await signup({ 
      name,
      email, 
      password, 
      confirmPassword,
      deviceId: 'default-device', // You might want to generate this dynamically
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Create Account</Text>
      
      {/* Error Message */}
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      
      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#666673"
          value={name}
          onChangeText={setName}
          autoComplete="name"
        />
      </View>

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
          autoComplete="new-password"
        />
      </View>

      {/* Password Confirmation Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor="#666673"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoComplete="new-password"
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity 
        style={[styles.signupButton, (!name || !email || !password || !confirmPassword) && styles.signupButtonDisabled]} 
        onPress={handleSignup}
        disabled={isLoading || !name || !email || !password || !confirmPassword}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.signupButtonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Login Link */}
      <Link href="/(auth)/login" asChild>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

// Styles for the signup screen components
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
  signupButton: {
    backgroundColor: '#2178FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonDisabled: {
    backgroundColor: '#2178FA80',
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  loginButton: {
    borderWidth: 2,
    borderColor: '#2178FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonText: {
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