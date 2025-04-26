import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const NavigationButton = ({ title, onPress }: { title: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <NavigationButton 
        title="Add Equipment" 
        onPress={() => router.push('/add-equipment')} 
      />
      <NavigationButton 
        title="List Equipment" 
        onPress={() => router.push('/list-equipment')} 
      />
      <NavigationButton 
        title="Today's Workout" 
        onPress={() => router.push('/todays-workout')} 
      />
      <NavigationButton 
        title="Past Workouts" 
        onPress={() => router.push('/past-workouts')} 
      />
      <NavigationButton 
        title="User Preferences" 
        onPress={() => router.push('/user-preferences')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 16,
    gap: 12,
  },
  button: {
    backgroundColor: '#3366FF',
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14.74,
    fontFamily: 'Inter',
    lineHeight: 18,
  }
});
