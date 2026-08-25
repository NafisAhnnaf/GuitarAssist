import React from 'react';
import { ChevronRight } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

import { ThemedText } from '../themed-text';
import { useTheme } from '@/hooks/use-theme';

interface MenuItemProps {
  title: string;
  onPressFn?: () => void;
}

export default function MenuItem({ title, onPressFn }: MenuItemProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPressFn}
      activeOpacity={0.7}
      className="w-full flex-row items-center justify-between rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800">
      <ThemedText className="font-medium">{title}</ThemedText>
      <ChevronRight size={20} color={theme.textSecondary} />
    </TouchableOpacity>
  );
}