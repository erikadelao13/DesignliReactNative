import { Stack } from 'expo-router';
import React from 'react';
import { WatchlistProvider } from '@context';
import { PortalProvider } from '@gorhom/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomeLayout() {
  return (
    <PortalProvider>
      <SafeAreaProvider>
        <WatchlistProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="add-alert"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="chart"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="watchlist"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </WatchlistProvider>
      </SafeAreaProvider>
    </PortalProvider>
  );
}
