import { Text, View } from 'react-native';

import { usageClasses } from '../styles';

export function ConsumptionHeader({ deviceLabel }: { deviceLabel?: string }) {
  return (
    <View className={usageClasses.header}>
      <Text className={usageClasses.title}>Consumo</Text>
      <Text className={usageClasses.subtitle}>Acompanhe seu historico de energia</Text>
      {deviceLabel ? <Text className={usageClasses.deviceLabel}>{deviceLabel}</Text> : null}
    </View>
  );
}
