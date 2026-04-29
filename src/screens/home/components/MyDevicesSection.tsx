import { ChevronRight, Plus, Power, PlugZap } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { SectionHeader } from '../../../components/SectionHeader';
import { HomeDevice } from '../../../data/energy';
import { colors } from '../../../theme/theme';
import { homeClasses, homePalette } from '../styles';

export function MyDevicesSection({ devices, onOpenDevices }: { devices: readonly HomeDevice[]; onOpenDevices?: () => void }) {
  return (
    <View className={homeClasses.devicesSection}>
      <SectionHeader title="Minhas tomadas" />
      <View className={homeClasses.devicesList}>
        {devices.map((device) => (
          <DeviceListItem device={device} key={device.id} onPress={onOpenDevices} />
        ))}
      </View>
      <Pressable accessibilityRole="button" className={homeClasses.floatingAddButton} onPress={onOpenDevices}>
        <Plus color={colors.surface} size={18} strokeWidth={2.4} />
      </Pressable>
    </View>
  );
}

function DeviceListItem({ device, onPress }: { device: HomeDevice; onPress?: () => void }) {
  const isOnline = device.status === 'online';

  return (
    <Pressable
      accessibilityRole="button"
      className={`${homeClasses.deviceListCard} ${!isOnline ? homeClasses.deviceListCardInactive : ''}`}
      onPress={onPress}
    >
      <View className={`${homeClasses.deviceListIcon} ${!isOnline ? homeClasses.deviceListIconInactive : ''}`}>
        {isOnline ? (
          <Power color={homePalette.primary} size={20} fill={homePalette.primary} />
        ) : (
          <PlugZap color={colors.textMuted} size={20} />
        )}
      </View>
      <View className={homeClasses.deviceListContent}>
        <Text className={`${homeClasses.deviceListName} ${!isOnline ? homeClasses.deviceListNameInactive : ''}`}>{device.name}</Text>
        <Text className={`${homeClasses.deviceListStatus} ${isOnline ? homeClasses.deviceListStatusOnline : homeClasses.deviceListStatusOffline}`}>
          {isOnline ? `Ativa - ${device.currentPowerWatts}W` : 'Inativo - Offline'}
        </Text>
      </View>
      <ChevronRight color={colors.textMuted} size={22} />
    </Pressable>
  );
}
