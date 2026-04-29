import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { SectionHeader } from '../../../components/SectionHeader';
import { ConsumptionPeriod } from '../../../data/energy';
import { usageClasses } from '../styles';

export function PeakTimesCard({ periodData }: { periodData: ConsumptionPeriod }) {
  return (
    <Card className={usageClasses.peaksCard}>
      <SectionHeader title="Horarios de pico" />
      <View className={usageClasses.peaksList}>
        {periodData.peaks.map((peak, index) => (
          <View key={peak.label} className={usageClasses.peakRow}>
            <View className={usageClasses.peakRank}>
              <Text className={usageClasses.peakRankText}>{index + 1}</Text>
            </View>
            <Text className={usageClasses.peakLabel}>{peak.label}</Text>
            <Text className={usageClasses.peakValue}>{peak.value}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}
