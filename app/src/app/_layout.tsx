import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider } from 'expo-sqlite';
import { useEffect } from 'react';
import { Text, useColorScheme, View } from 'react-native';
import '../global.css';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { db } from '@/db/client';
import { seedDatabase } from '@/db/seed';
import migrations from '../../drizzle/migrations';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      seedDatabase().catch((err) => {
        console.error('Failed to seed database:', err);
      });
    }
  }, [success]);

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-black p-4">
        <Text className="text-red-500 text-center font-bold">Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return null; // Keep native splash screen showing while migrations run
  }

  return (
    <SQLiteProvider databaseName="app.db">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="practice/transition/index" options={{ headerShown: false }} />
          <Stack.Screen
            name="practice/transition/[chord_family_id]"
            options={{ headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </SQLiteProvider>
  );
}

