import { Stack } from 'expo-router';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

function RootLayoutNav() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen 
          name="(auth)" 
          options={{ 
            headerShown: false,
            // Prevent going back to auth screens when logged in
            gestureEnabled: false,
          }} 
        />
      ) : (
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            // Prevent going back to auth screens when logged in
            gestureEnabled: false,
          }} 
        />
      )}
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
