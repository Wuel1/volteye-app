import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  DollarSign,
  Flame,
  Info,
  Moon,
  PlugZap,
  Power,
  Sparkles,
  X,
  WifiOff,
  Zap
} from 'lucide-react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Modal, Pressable, ScrollView, Text, View } from 'react-native';

import { Card } from '../../components/Card';
import { DeviceSelectorCard } from '../../components/DeviceSelectorCard';
import { SectionHeader } from '../../components/SectionHeader';
import { AlertFilterKey, AlertItem, alertsMock, AlertSeverity, AlertStatus, AlertType } from '../../data/energy';
import { colors } from '../../theme/theme';
import { alertsClasses, alertsPalette } from './styles';

const filterTabs: { key: AlertFilterKey; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'important', label: 'Importantes' },
  { key: 'consumption', label: 'Consumo' },
  { key: 'connection', label: 'Conexao' }
];

const severityLabel: Record<AlertSeverity, string> = {
  high: 'Alta',
  low: 'Baixa',
  medium: 'Media'
};

const statusLabel: Record<AlertStatus, string> = {
  new: 'Novo',
  resolved: 'Resolvido',
  seen: 'Visto'
};

export function AlertsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<AlertFilterKey>('all');
  const [selectedDeviceId, setSelectedDeviceId] = useState(alertsMock.selectedDevice?.id);
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);
  const device = alertsMock.devices.find((item) => item.id === selectedDeviceId) ?? alertsMock.selectedDevice;

  const filteredAlerts = useMemo(() => {
    return alertsMock.alerts.filter((alert) => {
      if (selectedFilter === 'all') {
        return true;
      }

      if (selectedFilter === 'important') {
        return alert.severity === 'high' || alert.status === 'new';
      }

      return alert.category === selectedFilter;
    });
  }, [selectedFilter]);

  if (!device) {
    return (
      <ScrollView contentContainerClassName={alertsClasses.content} showsVerticalScrollIndicator={false}>
        <AlertsHeader />
        <NoDeviceAlertsState />
      </ScrollView>
    );
  }

  const isOffline = device.status === 'offline';

  return (
    <>
      <ScrollView contentContainerClassName={alertsClasses.content} showsVerticalScrollIndicator={false}>
        <AlertsHeader statusText={`${alertsMock.summary.activeAlerts} alertas precisam da sua atencao`} />
        <DeviceSelectorCard
          devices={alertsMock.devices}
          onSelectDevice={(selectedDevice) => setSelectedDeviceId(selectedDevice.id)}
          selectedDevice={device}
        />
        {isOffline ? <OfflineDeviceNotice /> : null}
        <AlertsSummaryCard />
        <AlertsFilterTabs selectedFilter={selectedFilter} onSelectFilter={setSelectedFilter} />
        {alertsMock.highlightedAlert ? (
          <HighlightedAlertCard alert={alertsMock.highlightedAlert} onPress={() => setSelectedAlert(alertsMock.alerts[0])} />
        ) : null}
        <SmartRecommendationCard />
        {filteredAlerts.length ? (
          <View className={alertsClasses.list}>
            <SectionHeader title="Eventos recentes" />
            {filteredAlerts.map((alert) => (
              <AlertCard alert={alert} key={alert.id} onPress={() => setSelectedAlert(alert)} />
            ))}
          </View>
        ) : (
          <EmptyAlertsState />
        )}
      </ScrollView>
      <AlertDetailModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} />
    </>
  );
}

function AlertsHeader({ statusText }: { statusText?: string }) {
  return (
    <View className={alertsClasses.header}>
      <Text className={alertsClasses.title}>Alertas</Text>
      <Text className={alertsClasses.subtitle}>Acompanhe mudancas importantes no consumo</Text>
      {statusText ? <Text className={alertsClasses.headerStatus}>{statusText}</Text> : null}
    </View>
  );
}

function AlertsSummaryCard() {
  return (
    <Card className={alertsClasses.summaryCard}>
      <SectionHeader title="Resumo de alertas" />
      <View className={alertsClasses.summaryGrid}>
        <View className={alertsClasses.summaryItem}>
          <Text className={alertsClasses.summaryLabel}>Ativos</Text>
          <Text className={alertsClasses.summaryValue}>{alertsMock.summary.activeAlerts}</Text>
        </View>
        <View className={alertsClasses.summaryItem}>
          <Text className={alertsClasses.summaryLabel}>Semana</Text>
          <Text className={alertsClasses.summaryValue}>{alertsMock.summary.weeklyEvents}</Text>
        </View>
        <View className={alertsClasses.summaryItem}>
          <Text className={alertsClasses.summaryLabel}>Status</Text>
          <Text className={alertsClasses.summaryValue}>Online</Text>
        </View>
      </View>
      <Text className="mt-3 text-sm font-bold text-textMuted">{alertsMock.summary.generalStatus}</Text>
    </Card>
  );
}

function AlertsFilterTabs({
  onSelectFilter,
  selectedFilter
}: {
  onSelectFilter: (filter: AlertFilterKey) => void;
  selectedFilter: AlertFilterKey;
}) {
  return (
    <View className={alertsClasses.filters}>
      {filterTabs.map((filter) => (
        <AlertFilterChip
          filter={filter}
          isActive={selectedFilter === filter.key}
          key={filter.key}
          onPress={() => onSelectFilter(filter.key)}
        />
      ))}
    </View>
  );
}

function AlertFilterChip({
  filter,
  isActive,
  onPress
}: {
  filter: { key: AlertFilterKey; label: string };
  isActive: boolean;
  onPress: () => void;
}) {
  const activeAnimation = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(activeAnimation, {
      damping: 16,
      mass: 0.7,
      stiffness: 180,
      toValue: isActive ? 1 : 0,
      useNativeDriver: true
    }).start();
  }, [activeAnimation, isActive]);

  return (
    <Animated.View
      style={{
        opacity: activeAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.86, 1]
        }),
        transform: [
          {
            scale: activeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.04]
            })
          }
        ]
      }}
    >
      <Pressable
        accessibilityRole="button"
        className={`${alertsClasses.filterChip} ${isActive ? alertsClasses.filterChipActive : ''}`}
        onPress={onPress}
      >
        <Text className={`${alertsClasses.filterChipText} ${isActive ? alertsClasses.filterChipTextActive : ''}`}>
          {filter.label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function HighlightedAlertCard({
  alert,
  onPress
}: {
  alert: NonNullable<typeof alertsMock.highlightedAlert>;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <Card className={alertsClasses.highlightedCard}>
        <Text className={alertsClasses.highlightedLabel}>Alerta em destaque</Text>
        <Text className={alertsClasses.highlightedTitle}>{alert.title}</Text>
        <Text className={alertsClasses.highlightedDescription}>{alert.description}</Text>
        <View className={alertsClasses.highlightedFooter}>
          <Text className="text-xs font-black uppercase text-[#F0ECFF]">{alert.date}</Text>
          <Text className="text-sm font-black text-surface">Ver detalhes</Text>
        </View>
      </Card>
    </Pressable>
  );
}

function SmartRecommendationCard() {
  return (
    <Card className={alertsClasses.recommendationCard}>
      <Text className={alertsClasses.recommendationTitle}>{alertsMock.recommendation.title}</Text>
      <Text className={alertsClasses.recommendationDescription}>{alertsMock.recommendation.description}</Text>
      <Pressable accessibilityRole="button" className={alertsClasses.recommendationAction}>
        <Text className={alertsClasses.recommendationActionText}>{alertsMock.recommendation.actionLabel}</Text>
      </Pressable>
      <View className={alertsClasses.recommendationIcon}>
        <Sparkles color={colors.surface} size={104} />
      </View>
    </Card>
  );
}

function AlertCard({ alert, onPress }: { alert: AlertItem; onPress: () => void }) {
  const Icon = getAlertIcon(alert.type);

  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <Card className={alertsClasses.alertCard}>
        <View className={`${alertsClasses.alertIcon} ${getSeverityTone(alert.severity).bg}`}>
          <Icon color={getSeverityTone(alert.severity).color} size={22} />
        </View>
        <View className={alertsClasses.alertContent}>
          <Text className={alertsClasses.deviceLabel}>
            {alert.deviceName} - {alert.room}
          </Text>
          <Text className={alertsClasses.alertTitle}>{alert.title}</Text>
          <Text className={alertsClasses.alertDate}>{alert.date}</Text>
          <Text className={alertsClasses.alertDescription}>{alert.description}</Text>
          <View className={alertsClasses.alertMeta}>
            <Badge label={severityLabel[alert.severity]} tone={getSeverityTone(alert.severity)} />
            <Badge label={statusLabel[alert.status]} tone={getStatusTone(alert.status)} />
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

function AlertDetailModal({ alert, onClose }: { alert: AlertItem | null; onClose: () => void }) {
  if (!alert) {
    return null;
  }

  const Icon = getAlertIcon(alert.type);

  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible>
      <View className={alertsClasses.detailOverlay}>
        <Card className={alertsClasses.detailCard}>
          <View className={alertsClasses.detailHeader}>
            <Text className={alertsClasses.detailTitle}>{alert.title}</Text>
            <Pressable accessibilityRole="button" className={alertsClasses.modalClose} onPress={onClose}>
              <X color={alertsPalette.text} size={20} />
            </Pressable>
          </View>
          <View className="mt-3 flex-row items-center gap-2">
            <View className={`${alertsClasses.alertIcon} ${getSeverityTone(alert.severity).bg}`}>
              <Icon color={getSeverityTone(alert.severity).color} size={22} />
            </View>
            <View className="flex-1">
              <Text className={alertsClasses.detailSubtitle}>
                {alert.deviceName} - {alert.room}
              </Text>
              <Text className={alertsClasses.alertDate}>{alert.date}</Text>
            </View>
          </View>
          <DetailSection label="Descricao" text={alert.detail} />
          <DetailSection label="Possivel explicacao" text={alert.explanation} />
          <DetailSection label="Recomendacao" text={alert.recommendation} />
          <View className={alertsClasses.detailActions}>
            <Pressable accessibilityRole="button" className={alertsClasses.detailButtonSecondary} onPress={onClose}>
              <Text className={alertsClasses.detailButtonSecondaryText}>Marcar como visto</Text>
            </Pressable>
            <Pressable accessibilityRole="button" className={alertsClasses.detailButtonPrimary} onPress={onClose}>
              <Text className={alertsClasses.detailButtonPrimaryText}>Ver consumo</Text>
            </Pressable>
          </View>
        </Card>
      </View>
    </Modal>
  );
}

function DetailSection({ label, text }: { label: string; text: string }) {
  return (
    <View className={alertsClasses.detailSection}>
      <Text className={alertsClasses.sectionLabel}>{label}</Text>
      <Text className={alertsClasses.sectionBody}>{text}</Text>
    </View>
  );
}

function Badge({
  label,
  tone
}: {
  label: string;
  tone: {
    bg: string;
    text: string;
  };
}) {
  return (
    <View className={`${alertsClasses.badge} ${tone.bg}`}>
      <Text className={`${alertsClasses.badgeText} ${tone.text}`}>{label}</Text>
    </View>
  );
}

function EmptyAlertsState() {
  return (
    <Card className={alertsClasses.emptyCard}>
      <View className={alertsClasses.emptyIcon}>
        <CheckCircle2 color={alertsPalette.success} size={34} />
      </View>
      <Text className={alertsClasses.emptyTitle}>Nenhum alerta por enquanto</Text>
      <Text className={alertsClasses.emptyText}>
        Esta tudo certo. Avisaremos quando identificarmos algo fora do padrao.
      </Text>
    </Card>
  );
}

function NoDeviceAlertsState() {
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

function OfflineDeviceNotice() {
  return (
    <Card className={alertsClasses.offlineNotice}>
      <WifiOff color={colors.warning} size={20} />
      <View className={alertsClasses.offlineNoticeText}>
        <Text className={alertsClasses.offlineNoticeTitle}>A tomada esta offline no momento</Text>
        <Text className={alertsClasses.offlineNoticeBody}>
          Alguns alertas podem ficar indisponiveis ate a conexao ser restabelecida.
        </Text>
      </View>
    </Card>
  );
}

function getAlertIcon(type: AlertType) {
  const icons = {
    constant_consumption: Moon,
    daily_cost: DollarSign,
    high_consumption: AlertTriangle,
    long_usage: Clock3,
    offline: WifiOff,
    peak_detected: Flame
  };

  return icons[type] ?? Info;
}

function getSeverityTone(severity: AlertSeverity) {
  const tones = {
    high: {
      bg: alertsClasses.severityHigh,
      color: colors.danger,
      text: alertsClasses.severityHighText
    },
    low: {
      bg: alertsClasses.severityLow,
      color: alertsPalette.primary,
      text: alertsClasses.severityLowText
    },
    medium: {
      bg: alertsClasses.severityMedium,
      color: colors.warning,
      text: alertsClasses.severityMediumText
    }
  };

  return tones[severity];
}

function getStatusTone(status: AlertStatus) {
  const tones = {
    new: {
      bg: alertsClasses.statusNew,
      text: alertsClasses.statusNewText
    },
    resolved: {
      bg: alertsClasses.statusResolved,
      text: alertsClasses.statusResolvedText
    },
    seen: {
      bg: alertsClasses.statusSeen,
      text: alertsClasses.statusSeenText
    }
  };

  return tones[status];
}
