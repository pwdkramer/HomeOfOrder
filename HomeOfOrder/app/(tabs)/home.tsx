import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome Home</Text>
      <Text>Navigate to other pages using the tabs to view, create, or mark complete tasks.</Text>
    </View>
  );
}