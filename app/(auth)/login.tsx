import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * LoginScreen Component
 * 
 * Provides user authentication functionality with a form for username/email and password.
 * Uses the AuthContext to manage authentication state and navigation.
 * 
 * Features:
 * - Username/Email input
 * - Password input with secure entry
 * - Login button
 * - Link to signup page
 */
export default function LoginScreen() {
  // State for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Get login function from auth context
  const { login } = useAuth();

  /**
   * Handle login button press
   * Currently implements basic validation (non-empty fields)
   * TODO: Add proper authentication logic
   */
  const handleLogin = () => {
    if (username && password) {
      login();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Welcome Back!</Text>
      
      {/* Username/Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username or Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username or email"
          placeholderTextColor="#666673"
          value={username}
          onChangeText={setUsername}
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
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
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
}); 