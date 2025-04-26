import { Stack } from 'expo-router';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

function RootLayoutNav() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack>
      {!isAuthenticated ? (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found" />
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
