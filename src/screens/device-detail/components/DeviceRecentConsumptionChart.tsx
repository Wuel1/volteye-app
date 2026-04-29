import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { SectionHeader } from '../../../components/SectionHeader';
import { deviceDetailClasses, deviceDetailPalette } from '../styles';
import { formatDecimal } from '../formatters';

type RecentChartPoint = {
  label: string;
  value: number;
};

export function DeviceRecentConsumptionChart({ data }: { data: RecentChartPoint[] }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <Card className={deviceDetailClasses.chartCard}>
      <SectionHeader actionLabel="ultimas horas" title="Consumo recente" />
      <Text className="mt-1 text-sm font-bold text-textMuted">Variacao das ultimas horas</Text>
      <View className={deviceDetailClasses.chart}>
        {data.map((item) => {
          const isPeak = item.value === maxValue;

          return (
            <View className="flex-1 items-center gap-1" key={item.label}>
              <View className="h-[112px] w-full justify-end overflow-hidden rounded-2xl bg-[#EEF3FF]">
                <View
                  className="w-full rounded-2xl"
                  style={{
                    backgroundColor: isPeak ? deviceDetailPalette.primary : deviceDetailPalette.secondarySoft,
                    height: `${Math.max((item.value / maxValue) * 100, item.value > 0 ? 10 : 0)}%`,
                    minHeight: item.value > 0 ? 12 : 0
                  }}
                />
              </View>
              <Text className="text-[11px] font-black text-[#283351]">{formatDecimal(item.value)}</Text>
              <Text className="text-xs font-extrabold text-textMuted">{item.label}</Text>
            </View>
          );
        })}
      </View>
    </Card>
  );
}
