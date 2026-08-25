import React from 'react';
import {
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ScreenContainerProps = ViewProps & {
  children?: React.ReactNode;
  /**
   * If true, wraps the screen in a ScrollView.
   * If false, renders a fixed View (suitable for FlatList or non-scrolling screens).
   * @default false
   */
  scrollable?: boolean;
  /**
   * If true, applies standard safe-area, tab-bar insets, and horizontal padding.
   * @default true
   */
  padded?: boolean;
  /**
   * Tailwind classes or CSS for the inner content container.
   */
  contentContainerClassName?: string;
  /**
   * Style for the inner content container.
   */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Additional props to pass to ScrollView when scrollable is true.
   */
  scrollViewProps?: Omit<ScrollViewProps, 'children' | 'style' | 'contentContainerStyle'>;
};

export function ScreenContainer({
  children,
  scrollable = false,
  padded = true,
  className = '',
  contentContainerClassName = '',
  style,
  contentContainerStyle,
  scrollViewProps,
  ...rest
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const bottomInset = insets.bottom + BottomTabInset + Spacing.three;

  const insetsPadding: ViewStyle = padded
    ? {
      paddingTop: Platform.OS === 'web' ? Spacing.six : insets.top,
      paddingBottom: bottomInset,
      paddingLeft: insets.left + Spacing.four,
      paddingRight: insets.right + Spacing.four,
    }
    : {};

  if (scrollable) {
    return (
      <ScrollView
        style={[{ backgroundColor: theme.background }, styles.container, style]}
        contentContainerStyle={[
          styles.scrollContentContainer,
          insetsPadding,
          contentContainerStyle,
        ]}
        showsVerticalScrollIndicator={false}
        className={className}
        {...scrollViewProps}>
        <View
          style={[styles.innerContent, { maxWidth: MaxContentWidth }]}
          className={`w-full max-w-[800px] ${contentContainerClassName}`}>
          {children}
        </View>
      </ScrollView>
    );
  }

  return (
    <View
      style={[
        { backgroundColor: theme.background },
        styles.container,
        insetsPadding,
        style,
      ]}
      className={`flex-1 items-center ${className}`}
      {...rest}>
      <View
        style={[styles.innerContent, { maxWidth: MaxContentWidth }]}
        className={`w-full max-w-[800px] flex-1 ${contentContainerClassName}`}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  scrollContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  innerContent: {
    width: '100%',
  },
});
