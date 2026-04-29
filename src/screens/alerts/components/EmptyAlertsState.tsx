import { CheckCircle2 } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { alertsClasses, alertsPalette } from '../styles';

export function EmptyAlertsState() {
  return (
    <Card className={alertsClasses.emptyCard}>
      <View className={alertsClasses.emptyIcon}>
        <CheckCircle2 color={alertsPalette.success} size={34} />
      </View>
      <Text className={alertsClasses.emptyTitle}>Nenhum alerta por enquanto</Text>
      <Text className={alertsClasses.emptyText}>
        Esta tudo certo. Avisaremos quando identificarmos algo fora do padrao.
      </Text>
    </Card>
  );
}
