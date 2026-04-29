import { Text } from 'react-native';

import { Card } from '../../../components/Card';
import { homeClasses } from '../styles';

export function InsightCard({ text }: { text: string }) {
  return (
    <Card className={homeClasses.insightCard}>
      <Text className={homeClasses.insightLabel}>Insight do dia</Text>
      <Text className={homeClasses.insightTitle}>Uso normal</Text>
      <Text className={homeClasses.insightBody}>{text}</Text>
    </Card>
  );
}
