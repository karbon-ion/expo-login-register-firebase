import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Logout } from '~/components/Logout';
import { logoutUser } from '~/services/authService';

export default function UserProfileScreen() {

  return (
    <View className="flex-1 items-center justify-center">
      <Logout />
    </View>
  );
}
