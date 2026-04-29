import { Clock3, DollarSign, PlugZap } from 'lucide-react-native';
import { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { deviceDetailClasses, deviceDetailPalette } from '../styles';
import { formatCurrency, formatDecimal } from '../formatters';

type DeviceTodaySummary = {
  consumptionKwh: number;
  cost: number;
  activeTime: string;
};

export function DeviceDailySummaryCards({ today }: { today: DeviceTodaySummary }) {
  return (
    <View className={deviceDetailClasses.metricGrid}>
      <DailySummaryCard
        icon={<PlugZap color={deviceDetailPalette.primary} size={18} />}
        label="Consumo hoje"
        value={`${formatDecimal(today.consumptionKwh)} kWh`}
      />
      <DailySummaryCard
        icon={<DollarSign color={deviceDetailPalette.success} size={18} />}
        label="Custo hoje"
        value={formatCurrency(today.cost)}
      />
      <DailySummaryCard
        icon={<Clock3 color={deviceDetailPalette.warning} size={18} />}
        label="Tempo ativa"
        value={today.activeTime}
      />
    </View>
  );
}

function DailySummaryCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <Card className={deviceDetailClasses.summaryCard}>
      <View className={deviceDetailClasses.summaryIcon}>{icon}</View>
      <Text className={deviceDetailClasses.summaryLabel}>{label}</Text>
      <Text className={deviceDetailClasses.summaryValue}>{value}</Text>
    </Card>
  );
}
