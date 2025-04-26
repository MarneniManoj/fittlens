import { View, Text, StyleSheet } from 'react-native';

export default function UserPreferences() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Preferences</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
}); 