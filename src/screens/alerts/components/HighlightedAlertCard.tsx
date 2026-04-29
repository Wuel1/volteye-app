import { Pressable, Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { alertsMock } from '../../../data/energy';
import { alertsClasses } from '../styles';

export function HighlightedAlertCard({
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
