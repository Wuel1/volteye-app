import { PlugZap, Wifi, WifiOff } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { DeviceDetailData } from '../../../data/energy';
import { colors } from '../../../theme/theme';
import { deviceDetailClasses, deviceDetailPalette } from '../styles';

export function DeviceStatusCard({ device }: { device: DeviceDetailData }) {
  const isOnline = device.status === 'online';

  return (
    <Card className={deviceDetailClasses.statusCard}>
      <View className={deviceDetailClasses.statusIcon}>
        <PlugZap color={isOnline ? deviceDetailPalette.primary : colors.textMuted} size={24} />
      </View>
      <View className={deviceDetailClasses.statusContent}>
        <Text className={deviceDetailClasses.statusName}>{device.name}</Text>
        <Text className={deviceDetailClasses.statusLabel}>
          {device.room} • {device.lastUpdate}
        </Text>
      </View>
      <View className={`${deviceDetailClasses.statusPill} ${isOnline ? deviceDetailClasses.statusPillOnline : deviceDetailClasses.statusPillOffline}`}>
        {isOnline ? <Wifi color={deviceDetailPalette.success} size={13} /> : <WifiOff color={colors.danger} size={13} />}
        <Text className={isOnline ? deviceDetailClasses.statusPillTextOnline : deviceDetailClasses.statusPillTextOffline}>
          {isOnline ? 'Online' : 'Offline'}
        </Text>
      </View>
    </Card>
  );
}
