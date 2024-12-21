import { AppContextProvider } from '~/hooks/context';
import '../global.css';
import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {

  return (
    <AppContextProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </AppContextProvider>
  );
}
