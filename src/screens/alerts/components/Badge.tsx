import { Text, View } from 'react-native';

import { alertsClasses } from '../styles';

export function Badge({
  label,
  tone
}: {
  label: string;
  tone: {
    bg: string;
    text: string;
  };
}) {
  return (
    <View className={`${alertsClasses.badge} ${tone.bg}`}>
      <Text className={`${alertsClasses.badgeText} ${tone.text}`}>{label}</Text>
    </View>
  );
}
