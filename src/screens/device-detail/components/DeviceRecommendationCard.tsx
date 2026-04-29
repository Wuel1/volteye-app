import { Sparkles } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { colors } from '../../../theme/theme';
import { deviceDetailClasses } from '../styles';

export function DeviceRecommendationCard({ recommendation }: { recommendation: string }) {
  return (
    <Card className={deviceDetailClasses.recommendationCard}>
      <View className="flex-row items-start gap-3">
        <Sparkles color={colors.surface} size={22} />
        <View className="flex-1">
          <Text className={deviceDetailClasses.recommendationTitle}>Recomendacao rapida</Text>
          <Text className={deviceDetailClasses.recommendationText}>{recommendation}</Text>
        </View>
      </View>
    </Card>
  );
}
