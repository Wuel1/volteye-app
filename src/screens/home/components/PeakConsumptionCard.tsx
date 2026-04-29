import { Clock3 } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { homeClasses, homePalette } from '../styles';

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
