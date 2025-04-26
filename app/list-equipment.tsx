import { View, Text, StyleSheet } from 'react-native';

export default function ListEquipment() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Equipment</Text>
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