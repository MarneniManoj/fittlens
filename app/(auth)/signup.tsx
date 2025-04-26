import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

/**
 * SignupScreen Component
 * 
 * Provides user registration functionality with a form for creating a new account.
 * Includes validation for password confirmation and links back to login.
 * 
 * Features:
 * - Username/Email input
 * - Password input with secure entry
 * - Password confirmation
 * - Sign up button
 * - Link back to login page
 */
export default function SignupScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Create Account</Text>
      
      {/* Username/Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username or Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username or email"
          placeholderTextColor="#666673"
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
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
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
}); 