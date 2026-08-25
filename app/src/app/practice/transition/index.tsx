import React from 'react';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

import { ScreenContainer } from '@/components/screen-container';
import { ThemedText } from '@/components/themed-text';
import MenuItem from '@/components/ui/menu-item';
import { useTheme } from '@/hooks/use-theme';

export const CHORD_FAMILIES = [
  { id: 'g-em-c-d', name: 'G, Em, C, D', description: 'Beginner classic progression in G major' },
  { id: 'c-am-f-g', name: 'C, Am, F, G', description: 'Essential 50s progression in C major' },
  { id: 'd-bm-g-a', name: 'D, Bm, G, A', description: 'Great for learning the Bm barre chord' },
  { id: 'e-csm-a-b', name: 'E, C#m, A, B', description: 'Rock and acoustic pop standard' },
  { id: 'a-fsm-d-e', name: 'A, F#m, D, E', description: 'Popular A major progression' },
];

export default function ChordTransitionListScreen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <ScreenContainer scrollable>
      <View className="mb-6 flex-row items-center">
        <Pressable
          onPress={() => router.back()}
          className="mr-3 rounded-full p-2 active:opacity-60"
          hitSlop={8}>
          <ArrowLeft size={24} color={theme.text} />
        </Pressable>
        <ThemedText type="subtitle">Chord Transition</ThemedText>
      </View>

      <ThemedText className="mb-6" type="small" themeColor="textSecondary">
        Select a chord family to practice switching between chords:
      </ThemedText>

      <View className="gap-3">
        {CHORD_FAMILIES.map((family) => (
          <MenuItem
            key={family.id}
            title={family.name}
            onPressFn={() => router.push(`/practice/transition/${family.id}`)}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}
