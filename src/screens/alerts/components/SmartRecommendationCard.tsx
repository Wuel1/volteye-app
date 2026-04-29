import { Sparkles } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { alertsMock } from '../../../data/energy';
import { colors } from '../../../theme/theme';
import { alertsClasses } from '../styles';

export function SmartRecommendationCard() {
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
