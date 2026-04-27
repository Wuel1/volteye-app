import { ArrowLeft, ChevronRight, Plus, PlugZap, Search, Wifi, WifiOff } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Card } from '../../components/Card';
import { SectionHeader } from '../../components/SectionHeader';
import { PrivateRoutes } from '../../constants/routes';
import { DeviceManagementStatus, devicesMock, ManagedDevice } from '../../data/energy';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/theme';
import { devicesClasses, devicesPalette } from './styles';

type DevicesScreenProps = NativeStackScreenProps<RootStackParamList, typeof PrivateRoutes.DEVICES>;
type DeviceFilterKey = 'all' | DeviceManagementStatus;

const filterTabs: { key: DeviceFilterKey; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'online', label: 'Online' },
  { key: 'offline', label: 'Offline' }
];

export function DevicesScreen({ navigation }: DevicesScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState<DeviceFilterKey>('all');
  const filteredDevices = useMemo(() => {
    if (selectedFilter === 'all') {
      return devicesMock.devices;
    }

    return devicesMock.devices.filter((device) => device.status === selectedFilter);
  }, [selectedFilter]);

  return (
    <ScrollView contentContainerClassName={devicesClasses.content} showsVerticalScrollIndicator={false}>
      <DevicesHeader onBack={() => navigation.goBack()} />
      {devicesMock.devices.length ? (
        <>
          <DevicesSummaryCard />
          <HighestConsumptionCard />
          <DevicesFilterTabs selectedFilter={selectedFilter} onSelectFilter={setSelectedFilter} />
          <View className="gap-3">
            <SectionHeader title="Tomadas cadastradas" />
            {filteredDevices.map((device) => (
              <DeviceCard device={device} key={device.id} />
            ))}
          </View>
          <AddDeviceButton />
        </>
      ) : (
        <EmptyDevicesState />
      )}
    </ScrollView>
  );
}

function DevicesHeader({ onBack }: { onBack: () => void }) {
  return (
    <View className={devicesClasses.header}>
      <View className={devicesClasses.headerRow}>
        <Pressable accessibilityRole="button" className={devicesClasses.headerBack} onPress={onBack}>
          <ArrowLeft color={devicesPalette.text} size={21} />
        </Pressable>
        <View className="flex-1">
          <Text className={devicesClasses.headerTitle}>Minhas tomadas</Text>
          <Text className={devicesClasses.headerSubtitle}>Gerencie os dispositivos conectados ao VoltEye</Text>
        </View>
      </View>
    </View>
  );
}

function DevicesSummaryCard() {
  return (
    <Card className={devicesClasses.summaryCard}>
      <SectionHeader title="Resumo geral" />
      <View className={devicesClasses.summaryGrid}>
        <SummaryMetric label="Cadastradas" value={`${devicesMock.summary.totalDevices}`} />
        <SummaryMetric label="Online" value={`${devicesMock.summary.onlineDevices}`} />
        <SummaryMetric label="Offline" value={`${devicesMock.summary.offlineDevices}`} />
        <SummaryMetric label="Agora" value={`${devicesMock.summary.currentTotalPowerWatts} W`} />
        <SummaryMetric label="Hoje" value={formatCurrency(devicesMock.summary.todayTotalCost)} />
      </View>
    </Card>
  );
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <View className={devicesClasses.cardMetric}>
      <Text className={devicesClasses.cardMetricLabel}>{label}</Text>
      <Text className={devicesClasses.cardMetricValue}>{value}</Text>
    </View>
  );
}

function HighestConsumptionCard() {
  const onlinePowerTotal = devicesMock.devices.reduce((total, device) => total + device.currentPowerWatts, 0);
  const highestDevice = [...devicesMock.devices].sort((a, b) => b.currentPowerWatts - a.currentPowerWatts)[0];
  const percent = onlinePowerTotal ? Math.round((highestDevice.currentPowerWatts / onlinePowerTotal) * 100) : 0;
  const hasMultipleDevices = devicesMock.devices.length > 1;

  return (
    <Card className={devicesClasses.highlightCard}>
      <Text className={devicesClasses.highlightLabel}>Maior consumo agora</Text>
      <Text className={devicesClasses.highlightTitle}>{highestDevice.name}</Text>
      <Text className={devicesClasses.highlightBody}>
        {hasMultipleDevices
          ? `${highestDevice.name} representa ${percent}% do consumo atual monitorado.`
          : 'Esta e sua tomada monitorada no momento.'}
      </Text>
    </Card>
  );
}

function DevicesFilterTabs({
  onSelectFilter,
  selectedFilter
}: {
  onSelectFilter: (filter: DeviceFilterKey) => void;
  selectedFilter: DeviceFilterKey;
}) {
  return (
    <View className={devicesClasses.filters}>
      {filterTabs.map((filter) => {
        const isActive = selectedFilter === filter.key;

        return (
          <Pressable
            accessibilityRole="button"
            className={`${devicesClasses.filterChip} ${isActive ? devicesClasses.filterChipActive : ''}`}
            key={filter.key}
            onPress={() => onSelectFilter(filter.key)}
          >
            <Text className={`${devicesClasses.filterChipText} ${isActive ? devicesClasses.filterChipTextActive : ''}`}>
              {filter.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function DeviceCard({ device }: { device: ManagedDevice }) {
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

function AddDeviceButton() {
  return (
    <Pressable accessibilityRole="button" className={devicesClasses.addButton}>
      <Plus color={colors.surface} size={19} />
      <Text className={devicesClasses.addButtonText}>Adicionar tomada</Text>
    </Pressable>
  );
}

function EmptyDevicesState() {
  return (
    <Card className={devicesClasses.emptyCard}>
      <View className={devicesClasses.emptyIcon}>
        <Search color={devicesPalette.primary} size={34} />
      </View>
      <Text className={devicesClasses.emptyTitle}>Nenhuma tomada conectada</Text>
      <Text className={devicesClasses.emptyText}>
        Adicione sua primeira tomada inteligente para comecar a acompanhar seu consumo.
      </Text>
      <AddDeviceButton />
    </Card>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  }).format(value);
}

function formatDecimal(value: number) {
  return value.toFixed(1).replace('.', ',');
}
