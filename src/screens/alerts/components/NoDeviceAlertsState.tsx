import { PlugZap } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { alertsClasses, alertsPalette } from '../styles';

export function NoDeviceAlertsState() {
  return (
    <Card className={alertsClasses.emptyCard}>
      <View className={alertsClasses.emptyIcon}>
        <PlugZap color={alertsPalette.primary} size={34} />
      </View>
      <Text className={alertsClasses.emptyTitle}>Conecte uma tomada para receber alertas</Text>
      <Text className={alertsClasses.emptyText}>
        Depois que sua tomada comecar a enviar dados, o VoltEye podera identificar mudancas no consumo.
      </Text>
      <Pressable accessibilityRole="button" className={alertsClasses.noDeviceButton}>
        <Text className={alertsClasses.noDeviceButtonText}>Adicionar tomada</Text>
      </Pressable>
    </Card>
  );
}
