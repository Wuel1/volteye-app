import { AlertCircle, ChevronRight } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { HomeDevice } from '../../../data/energy';
import { colors } from '../../../theme/theme';
import { homeClasses } from '../styles';

export function OfflineState({ device }: { device: HomeDevice }) {
  return (
    <Card className={homeClasses.offlineCard}>
      <AlertCircle color={colors.danger} size={22} />
      <View className={homeClasses.offlineContent}>
        <Text className={homeClasses.offlineTitle}>Nao conseguimos receber dados da tomada agora.</Text>
        <Text className={homeClasses.offlineBody}>Ultimo registro: {device.lastKnownPowerWatts} W em {device.room}.</Text>
      </View>
      <Pressable accessibilityRole="button" className={homeClasses.connectionButton}>
        <Text className={homeClasses.connectionButtonText}>Verificar conexao</Text>
        <ChevronRight color={colors.danger} size={16} />
      </Pressable>
    </Card>
  );
}
