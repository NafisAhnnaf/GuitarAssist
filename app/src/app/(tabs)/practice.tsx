import { ScreenContainer } from '@/components/screen-container';
import { ThemedText } from '@/components/themed-text';
import MenuItem from '@/components/ui/menu-item';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function PracticeScreen() {
  const router = useRouter();
  return (
    <ScreenContainer>
      <View>
        <ThemedText className='text-center' type="subtitle">Practice</ThemedText>
        <ThemedText className='text-center mt-3 mb-8' type="small" >Upgrade your Guitar Skills through regulated practice</ThemedText>
      </View>
      <MenuItem onPressFn={() => router.push('/')} title="Learn Chords" />
      <MenuItem
        onPressFn={() => router.push('/practice/transition')}
        title="Chord Transition"
      />
    </ScreenContainer>
  );
}