import { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SafeArea({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();

  return <View style={{ paddingTop: insets.top, flex: 1 }}>{children}</View>;
}
