import { useMemo, useState } from 'react';
import { ScrollView } from 'react-native';

import { DeviceSelectorCard } from '../../components/DeviceSelectorCard';
import { consumptionMock, ConsumptionPeriodKey } from '../../data/energy';
import { ComparisonCard } from './components/ComparisonCard';
import { ConsumptionChart } from './components/ConsumptionChart';
import { ConsumptionHeader } from './components/ConsumptionHeader';
import { ConsumptionInsightCard } from './components/ConsumptionInsightCard';
import { ConsumptionSummaryCards } from './components/ConsumptionSummaryCards';
import { EmptyConsumptionState } from './components/EmptyConsumptionState';
import { OfflineDeviceNotice } from './components/OfflineDeviceNotice';
import { PeakTimesCard } from './components/PeakTimesCard';
import { PeriodFilterTabs } from './components/PeriodFilterTabs';
import { usageClasses } from './styles';

export function UsageScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<ConsumptionPeriodKey>('today');
  const [selectedDeviceId, setSelectedDeviceId] = useState(consumptionMock.selectedDevice?.id);
  const periodData = consumptionMock.periods[selectedPeriod];
  const device = consumptionMock.devices.find((item) => item.id === selectedDeviceId) ?? consumptionMock.selectedDevice;
  const hasConsumptionData = periodData.chart.length > 0;
  const maxChartValue = useMemo(
    () => Math.max(...periodData.chart.map((item) => item.value), 1),
    [periodData.chart]
  );

  if (!device || !hasConsumptionData) {
    return (
      <ScrollView contentContainerClassName={usageClasses.content} showsVerticalScrollIndicator={false}>
        <ConsumptionHeader />
        <EmptyConsumptionState />
      </ScrollView>
    );
  }

  const isOffline = device.status === 'offline';

  return (
    <ScrollView contentContainerClassName={usageClasses.content} showsVerticalScrollIndicator={false}>
      <ConsumptionHeader deviceLabel={`${device.name} - ${device.room}`} />
      <DeviceSelectorCard
        devices={consumptionMock.devices}
        onSelectDevice={(selectedDevice) => setSelectedDeviceId(selectedDevice.id)}
        selectedDevice={device}
      />
      {isOffline ? <OfflineDeviceNotice /> : null}
      <PeriodFilterTabs selectedPeriod={selectedPeriod} onSelectPeriod={setSelectedPeriod} />
      <ConsumptionSummaryCards periodData={periodData} />
      <ConsumptionChart maxValue={maxChartValue} periodData={periodData} />
      <ComparisonCard periodData={periodData} />
      <PeakTimesCard periodData={periodData} />
      <ConsumptionInsightCard insight={periodData.insight} />
    </ScrollView>
  );
}
