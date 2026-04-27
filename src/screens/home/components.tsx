import {
  AlertCircle,
  ChevronRight,
  Clock3,
  FileText,
  Plus,
  Power,
  PlugZap,
  User,
  WifiOff,
  Zap
} from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { Card } from '../../components/Card';
import { SectionHeader } from '../../components/SectionHeader';
import { HomeDevice } from '../../data/energy';
import { colors } from '../../theme/theme';
import { homeClasses, homePalette } from './styles';

export type DailyConsumptionPoint = {
  label: string;
  value: number;
};

type HomeHeaderProps = {
  userName: string;
};

type CurrentConsumptionCardProps = {
  device: HomeDevice;
  statusText: string;
};

type DailyConsumptionChartProps = {
  data: readonly DailyConsumptionPoint[];
};

type MyDevicesSectionProps = {
  devices: readonly HomeDevice[];
  onOpenDevices?: () => void;
};

const currentConsumptionBars = [38, 52, 46, 66, 84, 58, 94];

export function HomeHeader({ userName }: HomeHeaderProps) {
  return (
    <View className={homeClasses.header}>
      <View className={homeClasses.headerText}>
        <Text className={homeClasses.greeting}>Ola, {userName}</Text>
        <Text className={homeClasses.headerTitle}>Veja o consumo da sua tomada agora</Text>
      </View>
      <Pressable accessibilityLabel="Abrir perfil" accessibilityRole="button" className={homeClasses.profileButton}>
        <User color={homePalette.primary} size={22} />
      </Pressable>
    </View>
  );
}

export function CurrentConsumptionCard({ device, statusText }: CurrentConsumptionCardProps) {
  const isOnline = device.status === 'online';
  const powerWatts = isOnline ? device.currentPowerWatts : device.lastKnownPowerWatts;

  return (
    <Card className={homeClasses.consumptionCard}>
      <View className={homeClasses.consumptionTop}>
        <View>
          <Text className={homeClasses.consumptionLabel}>Consumo agora</Text>
          <View className={homeClasses.powerRow}>
            <Text className={homeClasses.powerValue}>{powerWatts}</Text>
            <Text className={homeClasses.powerUnit}>W</Text>
          </View>
        </View>
        <View className={`${homeClasses.healthPill} ${isOnline ? homeClasses.healthOk : homeClasses.healthOffline}`}>
          {isOnline ? <Zap color={homePalette.primary} size={14} /> : <WifiOff color={colors.danger} size={14} />}
          <Text className={`${homeClasses.healthText} ${!isOnline ? homeClasses.healthOfflineText : ''}`}>
            {isOnline ? 'Estavel' : 'Ultimo dado'}
          </Text>
        </View>
      </View>

      <View className={homeClasses.miniBars}>
        {currentConsumptionBars.map((height, index) => (
          <View
            className={homeClasses.miniBar}
            key={`${height}-${index}`}
            style={{
              backgroundColor: index === currentConsumptionBars.length - 1 ? homePalette.secondarySoft : 'rgba(255, 255, 255, 0.34)',
              height,
              minHeight: 22
            }}
          />
        ))}
      </View>

      <View className={homeClasses.consumptionFooter}>
        <View className={homeClasses.normalIndicator} />
        <Text className={homeClasses.consumptionStatus}>{isOnline ? statusText : 'Mostrando o ultimo consumo registrado'}</Text>
      </View>
      <Text className={homeClasses.lastUpdate}>{isOnline ? device.lastUpdate : 'Sem atualizacao em tempo real'}</Text>
    </Card>
  );
}

export function PeakConsumptionCard({ peakTime }: { peakTime: string }) {
  return (
    <Card className={homeClasses.infoCard}>
      <View className={homeClasses.infoIcon}>
        <Clock3 color={homePalette.primary} size={20} />
      </View>
      <View className={homeClasses.infoContent}>
        <Text className={homeClasses.infoLabel}>Pico de hoje</Text>
        <Text className={homeClasses.infoTitle}>{peakTime}</Text>
        <Text className={homeClasses.infoBody}>Foi o periodo em que a tomada mais consumiu energia.</Text>
      </View>
    </Card>
  );
}

export function InsightCard({ text }: { text: string }) {
  return (
    <Card className={homeClasses.insightCard}>
      <Text className={homeClasses.insightLabel}>Insight do dia</Text>
      <Text className={homeClasses.insightTitle}>Uso normal</Text>
      <Text className={homeClasses.insightBody}>{text}</Text>
    </Card>
  );
}

export function DailyConsumptionChart({ data }: DailyConsumptionChartProps) {
  const maxChartValue = Math.max(...data.map((item) => item.value));

  return (
    <Card className={homeClasses.chartCard}>
      <SectionHeader actionLabel="kWh" title="Consumo do dia" />
      <View className={homeClasses.chart}>
        {data.map((item) => (
          <View className={homeClasses.barGroup} key={item.label}>
            <View className={homeClasses.barTrack}>
              <View
                className="w-full rounded-2xl bg-[#918BFF]"
                style={{ height: `${Math.max((item.value / maxChartValue) * 100, 12)}%`, minHeight: 14 }}
              />
            </View>
            <Text className={homeClasses.barValue}>{item.value.toFixed(1).replace('.', ',')}</Text>
            <Text className={homeClasses.barLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

export function QuickActions() {
  const actions = [
    { Icon: FileText, label: 'Relatorio mensal' },
    { Icon: Plus, label: 'Adicionar tomada' }
  ];

  return (
    <View className={homeClasses.quickSection}>
      <SectionHeader title="Atalhos rapidos" />
      <View className={homeClasses.quickGrid}>
        {actions.map(({ Icon, label }) => (
          <Pressable accessibilityRole="button" className={homeClasses.quickAction} key={label}>
            <View className={homeClasses.quickIcon}>
              <Icon color={homePalette.primary} size={18} />
            </View>
            <Text className={homeClasses.quickLabel}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export function MyDevicesSection({ devices, onOpenDevices }: MyDevicesSectionProps) {
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

export function EmptyDeviceState() {
  return (
    <Card className={homeClasses.emptyCard}>
      <View className={homeClasses.emptyIcon}>
        <PlugZap color={homePalette.primary} size={34} />
      </View>
      <Text className={homeClasses.emptyTitle}>Nenhuma tomada conectada</Text>
      <Text className={homeClasses.emptyText}>
        Adicione sua primeira tomada inteligente para comecar a acompanhar seu consumo.
      </Text>
      <Pressable accessibilityRole="button" className={homeClasses.primaryButton}>
        <Plus color={colors.surface} size={18} />
        <Text className={homeClasses.primaryButtonText}>Adicionar tomada</Text>
      </Pressable>
    </Card>
  );
}

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
