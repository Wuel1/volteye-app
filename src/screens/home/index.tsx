import { BarChart3, PlugZap, Zap } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

import { SummaryCard } from '../../components/SummaryCard';
import { homeMock } from '../../data/energy';
import {
  CurrentConsumptionCard,
  DailyConsumptionChart,
  DeviceSelectorCard,
  EmptyDeviceState,
  HomeHeader,
  InsightCard,
  MyDevicesSection,
  OfflineState,
  PeakConsumptionCard,
  QuickActions
} from './components';
import { homePalette, styles } from './styles';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency'
});

export function HomeScreen() {
  if (!homeMock.selectedDevice) {
    return (
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <HomeHeader userName={homeMock.userName} />
        <EmptyDeviceState />
      </ScrollView>
    );
  }

  const device = homeMock.selectedDevice;
  const isOffline = device.status === 'offline';

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <HomeHeader userName={homeMock.userName} />
      <DeviceSelectorCard device={device} />

      {isOffline ? <OfflineState device={device} /> : null}

      <CurrentConsumptionCard device={device} statusText={homeMock.summary.statusText} />

      <View style={styles.summaryGrid}>
        <SummaryCard
          helper="Baseado no uso atual"
          icon={<Zap color={homePalette.primary} size={18} />}
          label="Custo hoje"
          value={currencyFormatter.format(homeMock.summary.todayCost)}
        />
        <SummaryCard
          helper="Projecao para o mes"
          icon={<BarChart3 color={homePalette.secondary} size={18} />}
          label="Estimativa do mes"
          value={currencyFormatter.format(homeMock.summary.monthlyEstimate)}
        />
        <SummaryCard
          helper="Total registrado hoje"
          icon={<PlugZap color={homePalette.warning} size={18} />}
          label="Consumo hoje"
          value={`${homeMock.summary.todayConsumptionKwh.toFixed(1).replace('.', ',')} kWh`}
        />
      </View>

      <PeakConsumptionCard peakTime={homeMock.summary.peakTime} />
      <InsightCard text={homeMock.summary.comparisonText} />
      <DailyConsumptionChart data={homeMock.chart} />
      <QuickActions />
      <MyDevicesSection devices={homeMock.devices} />
    </ScrollView>
  );
}
