import { View } from 'react-native';

import { Card } from '../../../components/Card';
import { SectionHeader } from '../../../components/SectionHeader';
import { devicesMock } from '../../../data/energy';
import { devicesClasses } from '../styles';
import { formatCurrency } from '../formatters';
import { SummaryMetric } from './SummaryMetric';

export function DevicesSummaryCard() {
  return (
    <Card className={devicesClasses.summaryCard}>
      <SectionHeader title="Resumo geral" />
      <View className={devicesClasses.summaryGrid}>
        <SummaryMetric label="Cadastradas" value={`${devicesMock.summary.totalDevices}`} />
        <SummaryMetric label="Online" value={`${devicesMock.summary.onlineDevices}`} />
        <SummaryMetric label="Offline" value={`${devicesMock.summary.offlineDevices}`} />
        <SummaryMetric label="Agora" value={`${devicesMock.summary.currentTotalPowerWatts} W`} />
        <SummaryMetric label="Hoje" value={formatCurrency(devicesMock.summary.todayTotalCost)} />
      </View>
    </Card>
  );
}
