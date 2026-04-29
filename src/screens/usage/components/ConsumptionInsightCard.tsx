import { BarChart3 } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { colors } from '../../../theme/theme';
import { usageClasses } from '../styles';

export function ConsumptionInsightCard({ insight }: { insight: string }) {
  return (
    <Card className={usageClasses.insightCard}>
      <View className={usageClasses.insightIcon}>
        <BarChart3 color={colors.surface} size={22} />
      </View>
      <View className={usageClasses.insightContent}>
        <Text className={usageClasses.insightLabel}>Insight simples</Text>
        <Text className={usageClasses.insightText}>{insight}</Text>
      </View>
    </Card>
  );
}
