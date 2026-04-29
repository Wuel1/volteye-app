import { TrendingDown, TrendingUp } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { ConsumptionPeriod } from '../../../data/energy';
import { colors } from '../../../theme/theme';
import { usageClasses, usagePalette } from '../styles';

export function ComparisonCard({ periodData }: { periodData: ConsumptionPeriod }) {
  const isIncrease = periodData.comparison.direction === 'up';
  const Icon = isIncrease ? TrendingUp : TrendingDown;
  const toneClassName = isIncrease ? usageClasses.comparisonUp : usageClasses.comparisonDown;
  const textClassName = isIncrease ? usageClasses.comparisonUpText : usageClasses.comparisonDownText;

  return (
    <Card className={usageClasses.comparisonCard}>
      <View className={`${usageClasses.comparisonIcon} ${toneClassName}`}>
        <Icon color={isIncrease ? colors.danger : usagePalette.success} size={22} />
      </View>
      <View className={usageClasses.comparisonContent}>
        <Text className={usageClasses.cardEyebrow}>Comparacao</Text>
        <Text className={usageClasses.comparisonText}>{periodData.comparison.text}</Text>
        <Text className={`${usageClasses.comparisonBadge} ${textClassName}`}>
          {isIncrease ? 'Aumento' : 'Reducao'} de {periodData.comparison.value}%
        </Text>
      </View>
    </Card>
  );
}
