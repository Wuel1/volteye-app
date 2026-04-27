import {
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileText,
  Plus,
  Power,
  PlugZap,
  User,
  Wifi,
  WifiOff,
  Zap
} from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { Card } from '../../components/Card';
import { SectionHeader } from '../../components/SectionHeader';
import { HomeDevice } from '../../data/energy';
import { colors } from '../../theme/theme';
import { homePalette, styles } from './styles';

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
};

const currentConsumptionBars = [38, 52, 46, 66, 84, 58, 94];

export function HomeHeader({ userName }: HomeHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerText}>
        <Text style={styles.greeting}>Ola, {userName}</Text>
        <Text style={styles.headerTitle}>Veja o consumo da sua tomada agora</Text>
      </View>
      <Pressable accessibilityLabel="Abrir perfil" accessibilityRole="button" style={styles.profileButton}>
        <User color={homePalette.primary} size={22} />
      </Pressable>
    </View>
  );
}

export function DeviceSelectorCard({ device }: { device: HomeDevice }) {
  const isOnline = device.status === 'online';

  return (
    <Card style={styles.deviceCard}>
      <View style={styles.deviceIcon}>
        <PlugZap color={homePalette.primary} size={22} />
      </View>
      <View style={styles.deviceContent}>
        <View style={styles.deviceTitleRow}>
          <Text style={styles.deviceName}>{device.name}</Text>
          <ChevronDown color={colors.textMuted} size={18} />
        </View>
        <Text style={styles.deviceRoom}>{device.room}</Text>
      </View>
      <View style={[styles.statusPill, isOnline ? styles.onlinePill : styles.offlinePill]}>
        {isOnline ? <Wifi color={homePalette.success} size={13} /> : <WifiOff color={colors.danger} size={13} />}
        <Text style={[styles.statusText, isOnline ? styles.onlineText : styles.offlineText]}>
          {isOnline ? 'Online' : 'Offline'}
        </Text>
      </View>
    </Card>
  );
}

export function CurrentConsumptionCard({ device, statusText }: CurrentConsumptionCardProps) {
  const isOnline = device.status === 'online';
  const powerWatts = isOnline ? device.currentPowerWatts : device.lastKnownPowerWatts;

  return (
    <Card style={styles.consumptionCard}>
      <View style={styles.consumptionTop}>
        <View>
          <Text style={styles.consumptionLabel}>Consumo agora</Text>
          <View style={styles.powerRow}>
            <Text style={styles.powerValue}>{powerWatts}</Text>
            <Text style={styles.powerUnit}>W</Text>
          </View>
        </View>
        <View style={[styles.healthPill, isOnline ? styles.healthOk : styles.healthOffline]}>
          {isOnline ? <Zap color={homePalette.primary} size={14} /> : <WifiOff color={colors.danger} size={14} />}
          <Text style={[styles.healthText, !isOnline && styles.healthOfflineText]}>
            {isOnline ? 'Estavel' : 'Ultimo dado'}
          </Text>
        </View>
      </View>

      <View style={styles.miniBars}>
        {currentConsumptionBars.map((height, index) => (
          <View
            key={`${height}-${index}`}
            style={[
              styles.miniBar,
              {
                backgroundColor: index === currentConsumptionBars.length - 1 ? homePalette.secondarySoft : 'rgba(255, 255, 255, 0.34)',
                height
              }
            ]}
          />
        ))}
      </View>

      <View style={styles.consumptionFooter}>
        <View style={styles.normalIndicator} />
        <Text style={styles.consumptionStatus}>{isOnline ? statusText : 'Mostrando o ultimo consumo registrado'}</Text>
      </View>
      <Text style={styles.lastUpdate}>{isOnline ? device.lastUpdate : 'Sem atualizacao em tempo real'}</Text>
    </Card>
  );
}

export function PeakConsumptionCard({ peakTime }: { peakTime: string }) {
  return (
    <Card style={styles.infoCard}>
      <View style={styles.infoIcon}>
        <Clock3 color={homePalette.primary} size={20} />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>Pico de hoje</Text>
        <Text style={styles.infoTitle}>{peakTime}</Text>
        <Text style={styles.infoBody}>Foi o periodo em que a tomada mais consumiu energia.</Text>
      </View>
    </Card>
  );
}

export function InsightCard({ text }: { text: string }) {
  return (
    <Card style={styles.insightCard}>
      <Text style={styles.insightLabel}>Insight do dia</Text>
      <Text style={styles.insightTitle}>Uso normal</Text>
      <Text style={styles.insightBody}>{text}</Text>
    </Card>
  );
}

export function DailyConsumptionChart({ data }: DailyConsumptionChartProps) {
  const maxChartValue = Math.max(...data.map((item) => item.value));

  return (
    <Card style={styles.chartCard}>
      <SectionHeader actionLabel="kWh" title="Consumo do dia" />
      <View style={styles.chart}>
        {data.map((item) => (
          <View key={item.label} style={styles.barGroup}>
            <View style={styles.barTrack}>
              <View style={[styles.bar, { height: `${Math.max((item.value / maxChartValue) * 100, 12)}%` }]} />
            </View>
            <Text style={styles.barValue}>{item.value.toFixed(1).replace('.', ',')}</Text>
            <Text style={styles.barLabel}>{item.label}</Text>
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
    <View style={styles.quickSection}>
      <SectionHeader title="Atalhos rapidos" />
      <View style={styles.quickGrid}>
        {actions.map(({ Icon, label }) => (
          <Pressable accessibilityRole="button" key={label} style={styles.quickAction}>
            <View style={styles.quickIcon}>
              <Icon color={homePalette.primary} size={18} />
            </View>
            <Text style={styles.quickLabel}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export function MyDevicesSection({ devices }: MyDevicesSectionProps) {
  return (
    <View style={styles.devicesSection}>
      <SectionHeader title="Minhas tomadas" />
      <View style={styles.devicesList}>
        {devices.map((device) => (
          <DeviceListItem device={device} key={device.id} />
        ))}
      </View>
      <Pressable accessibilityRole="button" style={styles.floatingAddButton}>
        <Plus color={colors.surface} size={18} strokeWidth={2.4} />
      </Pressable>
    </View>
  );
}

function DeviceListItem({ device }: { device: HomeDevice }) {
  const isOnline = device.status === 'online';

  return (
    <Pressable accessibilityRole="button" style={[styles.deviceListCard, !isOnline && styles.deviceListCardInactive]}>
      <View style={[styles.deviceListIcon, !isOnline && styles.deviceListIconInactive]}>
        {isOnline ? (
          <Power color={homePalette.primary} size={20} fill={homePalette.primary} />
        ) : (
          <PlugZap color={colors.textMuted} size={20} />
        )}
      </View>
      <View style={styles.deviceListContent}>
        <Text style={[styles.deviceListName, !isOnline && styles.deviceListNameInactive]}>{device.name}</Text>
        <Text style={[styles.deviceListStatus, isOnline ? styles.deviceListStatusOnline : styles.deviceListStatusOffline]}>
          {isOnline ? `Ativa • ${device.currentPowerWatts}W` : 'Inativo • Offline'}
        </Text>
      </View>
      <ChevronRight color={colors.textMuted} size={22} />
    </Pressable>
  );
}

export function EmptyDeviceState() {
  return (
    <Card style={styles.emptyCard}>
      <View style={styles.emptyIcon}>
        <PlugZap color={homePalette.primary} size={34} />
      </View>
      <Text style={styles.emptyTitle}>Nenhuma tomada conectada</Text>
      <Text style={styles.emptyText}>
        Adicione sua primeira tomada inteligente para comecar a acompanhar seu consumo.
      </Text>
      <Pressable accessibilityRole="button" style={styles.primaryButton}>
        <Plus color={colors.surface} size={18} />
        <Text style={styles.primaryButtonText}>Adicionar tomada</Text>
      </Pressable>
    </Card>
  );
}

export function OfflineState({ device }: { device: HomeDevice }) {
  return (
    <Card style={styles.offlineCard}>
      <AlertCircle color={colors.danger} size={22} />
      <View style={styles.offlineContent}>
        <Text style={styles.offlineTitle}>Nao conseguimos receber dados da tomada agora.</Text>
        <Text style={styles.offlineBody}>Ultimo registro: {device.lastKnownPowerWatts} W em {device.room}.</Text>
      </View>
      <Pressable accessibilityRole="button" style={styles.connectionButton}>
        <Text style={styles.connectionButtonText}>Verificar conexao</Text>
        <ChevronRight color={colors.danger} size={16} />
      </Pressable>
    </Card>
  );
}
