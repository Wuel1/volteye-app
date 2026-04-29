import { BarChart3, PlugZap, Zap } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { DeviceSelectorCard } from '../../components/DeviceSelectorCard';
import { SummaryCard } from '../../components/SummaryCard';
import { PrivateRoutes } from '../../constants/routes';
import { homeMock } from '../../data/energy';
import { RootStackParamList } from '../../navigation/types';
import { CurrentConsumptionCard } from './components/CurrentConsumptionCard';
import { DailyConsumptionChart } from './components/DailyConsumptionChart';
import { EmptyDeviceState } from './components/EmptyDeviceState';
import { HomeHeader } from './components/HomeHeader';
import { InsightCard } from './components/InsightCard';
import { MyDevicesSection } from './components/MyDevicesSection';
import { OfflineState } from './components/OfflineState';
import { PeakConsumptionCard } from './components/PeakConsumptionCard';
import { QuickActions } from './components/QuickActions';
import { homeClasses, homePalette } from './styles';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency'
});

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedDeviceId, setSelectedDeviceId] = useState(homeMock.selectedDevice?.id);
  const device = homeMock.devices.find((item) => item.id === selectedDeviceId) ?? homeMock.selectedDevice;

  if (!homeMock.selectedDevice) {
    return (
      <ScrollView contentContainerClassName={homeClasses.content} showsVerticalScrollIndicator={false}>
        <HomeHeader userName={homeMock.userName} />
        <EmptyDeviceState />
      </ScrollView>
    );
  }

  if (!device) {
    return null;
  }

  const isOffline = device.status === 'offline';

  return (
    <ScrollView contentContainerClassName={homeClasses.content} showsVerticalScrollIndicator={false}>
      <HomeHeader userName={homeMock.userName} />
      <DeviceSelectorCard
        devices={homeMock.devices}
        onSelectDevice={(selectedDevice) => setSelectedDeviceId(selectedDevice.id)}
        selectedDevice={device}
      />

      {isOffline ? <OfflineState device={device} /> : null}

      <CurrentConsumptionCard device={device} statusText={homeMock.summary.statusText} />

      <View className={homeClasses.summaryGrid}>
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
      <MyDevicesSection devices={homeMock.devices} onOpenDevices={() => navigation.navigate(PrivateRoutes.DEVICES)} />
    </ScrollView>
  );
}
