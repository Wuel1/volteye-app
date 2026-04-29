import { ChevronRight, PlugZap, Wifi, WifiOff } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { DeviceManagementStatus, ManagedDevice } from '../../../data/energy';
import { colors } from '../../../theme/theme';
import { devicesClasses, devicesPalette } from '../styles';
import { formatCurrency, formatDecimal } from '../formatters';
import { SummaryMetric } from './SummaryMetric';

export function DeviceCard({ device }: { device: ManagedDevice }) {
  const isOnline = device.status === 'online';

  return (
    <Card className={`${devicesClasses.deviceCard} ${!isOnline ? devicesClasses.deviceCardOffline : ''}`}>
      <View className={devicesClasses.deviceHeader}>
        <View className={devicesClasses.deviceIcon}>
          <PlugZap color={isOnline ? devicesPalette.primary : colors.textMuted} size={23} />
        </View>
        <View className={devicesClasses.deviceTitle}>
          <Text className={devicesClasses.deviceName}>{device.name}</Text>
          <Text className={devicesClasses.deviceRoom}>{device.room}</Text>
          <DeviceStatusBadge status={device.status} />
        </View>
        <ChevronRight color={colors.textMuted} size={22} />
      </View>

      <View className={devicesClasses.deviceMeta}>
        <SummaryMetric label="Agora" value={isOnline ? `${device.currentPowerWatts} W` : 'Indisp.'} />
        <SummaryMetric label="Consumo" value={`${formatDecimal(device.todayConsumptionKwh)} kWh`} />
        <SummaryMetric label="Custo" value={formatCurrency(device.todayCost)} />
      </View>

      <View className="mt-4 h-2 overflow-hidden rounded-full bg-[#EEF3FF]">
        <View
          className="h-full rounded-full bg-[#918BFF]"
          style={{ width: `${Math.max(Math.min((device.currentPowerWatts / 500) * 100, 100), isOnline ? 8 : 0)}%` }}
        />
      </View>

      {!isOnline ? (
        <>
          <Text className="mt-3 text-[13px] font-bold text-textMuted">{device.lastUpdate}</Text>
          <Pressable accessibilityRole="button" className={devicesClasses.offlineAction}>
            <Text className={devicesClasses.offlineActionText}>Verificar conexao</Text>
          </Pressable>
        </>
      ) : null}
    </Card>
  );
}

function DeviceStatusBadge({ status }: { status: DeviceManagementStatus }) {
  const isOnline = status === 'online';

  return (
    <View className={`${devicesClasses.badge} ${isOnline ? devicesClasses.badgeOnline : devicesClasses.badgeOffline}`}>
      {isOnline ? <Wifi color={devicesPalette.success} size={13} /> : <WifiOff color={colors.danger} size={13} />}
      <Text className={isOnline ? devicesClasses.badgeTextOnline : devicesClasses.badgeTextOffline}>
        {isOnline ? 'Online' : 'Offline'}
      </Text>
    </View>
  );
}
