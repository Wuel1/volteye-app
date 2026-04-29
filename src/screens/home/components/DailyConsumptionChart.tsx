import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { SectionHeader } from '../../../components/SectionHeader';
import { homeClasses, homePalette } from '../styles';

export type DailyConsumptionPoint = {
  label: string;
  value: number;
};

export function DailyConsumptionChart({ data }: { data: readonly DailyConsumptionPoint[] }) {
  const maxChartValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <Card className={homeClasses.chartCard}>
      <SectionHeader actionLabel="kWh" title="Consumo do dia" />
      <View className={homeClasses.chart}>
        {data.map((item) => {
          const isPeak = item.value === maxChartValue;

          return (
            <View className={homeClasses.barGroup} key={item.label}>
              <View className={homeClasses.barTrack}>
                <View
                  className="w-full rounded-2xl"
                  style={{
                    backgroundColor: isPeak ? homePalette.primary : homePalette.secondarySoft,
                    height: `${Math.max((item.value / maxChartValue) * 100, 12)}%`,
                    minHeight: 14
                  }}
                />
              </View>
              <Text className={homeClasses.barValue}>{item.value.toFixed(1).replace('.', ',')}</Text>
              <Text className={homeClasses.barLabel}>{item.label}</Text>
            </View>
          );
        })}
      </View>
    </Card>
  );
}
