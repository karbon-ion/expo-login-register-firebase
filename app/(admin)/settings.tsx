import { View, Text } from 'react-native';
import { Logout } from '~/components/Logout';

export default function AdminSettingsScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Logout />
    </View>
  );
}
