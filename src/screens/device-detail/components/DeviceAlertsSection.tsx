import { AlertTriangle, CheckCircle2 } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { SectionHeader } from '../../../components/SectionHeader';
import { DeviceDetailAlert } from '../../../data/energy';
import { colors } from '../../../theme/theme';
import { deviceDetailClasses, deviceDetailPalette } from '../styles';

export function DeviceAlertsSection({ alerts }: { alerts: DeviceDetailAlert[] }) {
  return (
    <View className="gap-3">
      <SectionHeader title="Ultimos alertas" />
      {alerts.length ? (
        alerts.slice(0, 3).map((alert) => <DeviceAlertCard alert={alert} key={alert.id} />)
      ) : (
        <View className={deviceDetailClasses.alertCard}>
          <CheckCircle2 color={deviceDetailPalette.success} size={22} />
          <Text className={deviceDetailClasses.alertTitle}>Nenhum alerta recente</Text>
          <Text className={deviceDetailClasses.alertDescription}>Esta tudo certo com esta tomada.</Text>
        </View>
      )}
    </View>
  );
}

function DeviceAlertCard({ alert }: { alert: DeviceDetailAlert }) {
  const tone = getSeverityTone(alert.severity);

  return (
    <View className={deviceDetailClasses.alertCard}>
      <View className={deviceDetailClasses.alertHeader}>
        <AlertTriangle color={tone.color} size={20} />
        <Text className={deviceDetailClasses.alertTitle}>{alert.title}</Text>
        <View className={`${deviceDetailClasses.alertSeverity} ${tone.bg}`}>
          <Text className={`text-[11px] font-black uppercase ${tone.text}`}>{tone.label}</Text>
        </View>
      </View>
      <Text className={deviceDetailClasses.alertDate}>{alert.date}</Text>
      <Text className={deviceDetailClasses.alertDescription}>{alert.description}</Text>
    </View>
  );
}

function getSeverityTone(severity: DeviceDetailAlert['severity']) {
  const tones = {
    high: {
      bg: deviceDetailClasses.alertSeverityHigh,
      color: colors.danger,
      label: 'Alta',
      text: deviceDetailClasses.alertSeverityTextHigh
    },
    low: {
      bg: deviceDetailClasses.alertSeverityLow,
      color: deviceDetailPalette.primary,
      label: 'Baixa',
      text: deviceDetailClasses.alertSeverityTextLow
    },
    medium: {
      bg: deviceDetailClasses.alertSeverityMedium,
      color: colors.warning,
      label: 'Media',
      text: deviceDetailClasses.alertSeverityTextMedium
    }
  };

  return tones[severity];
}
