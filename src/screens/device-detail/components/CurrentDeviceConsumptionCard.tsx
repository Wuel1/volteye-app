import { Zap } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { DeviceDetailData } from '../../../data/energy';
import { deviceDetailClasses } from '../styles';

export function CurrentDeviceConsumptionCard({ device }: { device: DeviceDetailData }) {
  const isOnline = device.status === 'online';
  const powerWatts = isOnline ? device.currentPowerWatts : device.lastKnownPowerWatts;

  return (
    <Card className={deviceDetailClasses.consumptionCard}>
      <Text className={deviceDetailClasses.consumptionLabel}>Consumo agora</Text>
      <View className={deviceDetailClasses.powerRow}>
        <Text className={deviceDetailClasses.powerValue}>{powerWatts}</Text>
        <Text className={deviceDetailClasses.powerUnit}>W</Text>
      </View>
      <Text className={deviceDetailClasses.consumptionDescription}>
        {isOnline ? 'Potencia atual medida pela tomada' : 'Ultimo consumo registrado'}
      </Text>
      <View className={deviceDetailClasses.consumptionFooter}>
        <Zap color="#A8FFD8" size={16} />
        <Text className={deviceDetailClasses.consumptionStatus}>{device.statusText}</Text>
      </View>
    </Card>
  );
}
