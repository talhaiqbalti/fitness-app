import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import 'react-native-reanimated';

import { store } from '@/store/store';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="exercise-detail" options={{ presentation: 'card', title: 'Exercise Details' }} />
        <Stack.Screen name="add-exercise" options={{ presentation: 'modal', title: 'Add Exercise' }} />
      </Stack>
      <StatusBar style="auto" />
    </Provider>
  );
}
