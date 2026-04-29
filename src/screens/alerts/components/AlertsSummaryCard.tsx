import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { SectionHeader } from '../../../components/SectionHeader';
import { alertsMock } from '../../../data/energy';
import { alertsClasses } from '../styles';

export function AlertsSummaryCard() {
  return (
    <Card className={alertsClasses.summaryCard}>
      <SectionHeader title="Resumo de alertas" />
      <View className={alertsClasses.summaryGrid}>
        <View className={alertsClasses.summaryItem}>
          <Text className={alertsClasses.summaryLabel}>Ativos</Text>
          <Text className={alertsClasses.summaryValue}>{alertsMock.summary.activeAlerts}</Text>
        </View>
        <View className={alertsClasses.summaryItem}>
          <Text className={alertsClasses.summaryLabel}>Semana</Text>
          <Text className={alertsClasses.summaryValue}>{alertsMock.summary.weeklyEvents}</Text>
        </View>
        <View className={alertsClasses.summaryItem}>
          <Text className={alertsClasses.summaryLabel}>Status</Text>
          <Text className={alertsClasses.summaryValue}>Online</Text>
        </View>
      </View>
      <Text className="mt-3 text-sm font-bold text-textMuted">{alertsMock.summary.generalStatus}</Text>
    </Card>
  );
}
