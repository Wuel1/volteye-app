import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { SectionHeader } from '../../../components/SectionHeader';
import { ConsumptionPeriod } from '../../../data/energy';
import { formatDecimal } from '../formatters';
import { usageClasses, usagePalette } from '../styles';

export function ConsumptionChart({ maxValue, periodData }: { maxValue: number; periodData: ConsumptionPeriod }) {
  return (
    <Card className={usageClasses.chartCard}>
      <SectionHeader actionLabel="kWh" title="Historico do periodo" />
      <View className={usageClasses.chart}>
        {periodData.chart.map((item, index) => {
          const isPeak = item.value === maxValue;

          return (
            <View key={`${item.label}-${index}`} className={usageClasses.barGroup}>
              <View className={usageClasses.barTrack}>
                <View
                  className="w-full rounded-2xl"
                  style={{
                    backgroundColor: isPeak ? usagePalette.secondary : usagePalette.primary,
                    height: `${Math.max((item.value / maxValue) * 100, 10)}%`,
                    minHeight: 12
                  }}
                />
              </View>
              <Text className={usageClasses.barValue}>{formatDecimal(item.value)}</Text>
              <Text className={usageClasses.barLabel}>{item.label}</Text>
            </View>
          );
        })}
      </View>
    </Card>
  );
}
