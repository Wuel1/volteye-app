import { Activity, Clock3, DollarSign, Zap } from 'lucide-react-native';
import { View } from 'react-native';

import { SummaryCard } from '../../../components/SummaryCard';
import { ConsumptionPeriod } from '../../../data/energy';
import { usageClasses, usagePalette } from '../styles';
import { formatDecimal } from '../formatters';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency'
});

export function ConsumptionSummaryCards({ periodData }: { periodData: ConsumptionPeriod }) {
  return (
    <View className={usageClasses.summaryGrid}>
      <SummaryCard
        helper="No periodo selecionado"
        icon={<Zap color={usagePalette.primary} size={18} />}
        label="Consumo total"
        value={`${formatDecimal(periodData.totalKwh)} kWh`}
      />
      <SummaryCard
        helper="Com base na tarifa media"
        icon={<DollarSign color={usagePalette.success} size={18} />}
        label="Custo estimado"
        value={currencyFormatter.format(periodData.estimatedCost)}
      />
      <SummaryCard
        helper="Comportamento medio"
        icon={<Activity color={usagePalette.secondary} size={18} />}
        label="Media do periodo"
        value={periodData.average}
      />
      <SummaryCard
        helper="Maior concentracao"
        icon={<Clock3 color={usagePalette.warning} size={18} />}
        label="Maior pico"
        value={periodData.peak}
      />
    </View>
  );
}
