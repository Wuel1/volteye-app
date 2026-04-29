import { X } from 'lucide-react-native';
import { Modal, Pressable, Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { AlertItem } from '../../../data/energy';
import { alertsClasses, alertsPalette } from '../styles';
import { getAlertIcon, getSeverityTone } from '../alertPresentation';

export function AlertDetailModal({ alert, onClose }: { alert: AlertItem | null; onClose: () => void }) {
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
