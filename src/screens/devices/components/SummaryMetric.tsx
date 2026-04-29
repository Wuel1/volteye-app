import { Text, View } from 'react-native';

import { devicesClasses } from '../styles';

export function SummaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <View className={devicesClasses.cardMetric}>
      <Text className={devicesClasses.cardMetricLabel}>{label}</Text>
      <Text className={devicesClasses.cardMetricValue}>{value}</Text>
    </View>
  );
}
