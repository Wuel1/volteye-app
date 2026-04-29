import { Text, View } from 'react-native';

import { alertsClasses } from '../styles';

export function AlertsHeader({ statusText }: { statusText?: string }) {
  return (
    <View className={alertsClasses.header}>
      <Text className={alertsClasses.title}>Alertas</Text>
      <Text className={alertsClasses.subtitle}>Acompanhe mudancas importantes no consumo</Text>
      {statusText ? <Text className={alertsClasses.headerStatus}>{statusText}</Text> : null}
    </View>
  );
}
