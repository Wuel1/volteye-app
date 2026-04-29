import { AlertCircle } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { usageClasses, usagePalette } from '../styles';

export function EmptyConsumptionState() {
  return (
    <Card className={usageClasses.emptyCard}>
      <View className={usageClasses.emptyIcon}>
        <AlertCircle color={usagePalette.primary} size={32} />
      </View>
      <Text className={usageClasses.emptyTitle}>Ainda nao ha dados suficientes</Text>
      <Text className={usageClasses.emptyText}>
        Assim que a tomada comecar a enviar informacoes, seu historico aparecera aqui.
      </Text>
    </Card>
  );
}
