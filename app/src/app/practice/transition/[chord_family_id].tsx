import { ScreenContainer } from '@/components/screen-container';
import { ThemedText } from '@/components/themed-text';
import Chord from '@/components/ui/chord';
import { useTheme } from '@/hooks/use-theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { CHORD_FAMILIES } from './index';

export default function ChordTransitionSessionScreen() {
  const { chord_family_id } = useLocalSearchParams<{ chord_family_id: string }>();
  const router = useRouter();
  const theme = useTheme();

  const family = CHORD_FAMILIES.find((f) => f.id === chord_family_id);
  const title = family ? family.name : chord_family_id;

  return (
    <ScreenContainer>
      <View className="mb-6 flex-row items-center">
        <Pressable
          onPress={() => router.back()}
          className="mr-3 rounded-full p-2 active:opacity-60"
          hitSlop={8}>
          <ArrowLeft size={24} color={theme.text} />
        </Pressable>
        <ThemedText type="subtitle">Transition Practice</ThemedText>
      </View>

      <View className="items-center justify-center rounded-2xl bg-neutral-100 p-8 dark:bg-neutral-800">
        <ThemedText type="title" className="text-center font-bold">
          {title}
        </ThemedText>
        {family && (
          <ThemedText type="small" themeColor="textSecondary" className="mt-3 text-center">
            {family.description}
          </ThemedText>
        )}
      </View>
      <Chord />
    </ScreenContainer>
  );
}
