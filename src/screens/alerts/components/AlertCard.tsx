import { Pressable, Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { AlertItem } from '../../../data/energy';
import { alertsClasses } from '../styles';
import { Badge } from './Badge';
import { getAlertIcon, getSeverityTone, getStatusTone, severityLabel, statusLabel } from '../alertPresentation';

export function AlertCard({ alert, onPress }: { alert: AlertItem; onPress: () => void }) {
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
