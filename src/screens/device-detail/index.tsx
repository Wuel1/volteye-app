import { MoreVertical } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenHeader } from '../../components/ScreenHeader';
import { PrivateRoutes } from '../../constants/routes';
import { deviceDetailsMock } from '../../data/energy';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/theme';
import { DeviceActionsList } from './components/DeviceActionsList';
import { DeviceAlertsSection } from './components/DeviceAlertsSection';
import { DeviceDailySummaryCards } from './components/DeviceDailySummaryCards';
import { DeviceNotFoundState } from './components/DeviceNotFoundState';
import { DeviceRecentConsumptionChart } from './components/DeviceRecentConsumptionChart';
import { DeviceRecommendationCard } from './components/DeviceRecommendationCard';
import { DeviceStatusCard } from './components/DeviceStatusCard';
import { CurrentDeviceConsumptionCard } from './components/CurrentDeviceConsumptionCard';
import { OfflineDeviceDetailNotice } from './components/OfflineDeviceDetailNotice';
import { deviceDetailClasses } from './styles';

type DeviceDetailScreenProps = NativeStackScreenProps<RootStackParamList, typeof PrivateRoutes.DEVICE_DETAIL>;

export function DeviceDetailScreen({ navigation, route }: DeviceDetailScreenProps) {
  const matchedDevice = deviceDetailsMock.find((item) => item.id === route.params.deviceId);
  const device = matchedDevice
    ? {
        ...matchedDevice,
        name: route.params.deviceName ?? matchedDevice.name,
        room: route.params.deviceRoom ?? matchedDevice.room
      }
    : null;

  if (!device) {
    return (
      <View className="flex-1 bg-[#F9F8FF]">
        <ScreenHeader onBack={() => navigation.goBack()} subtitle="Dispositivo indisponivel" title="Detalhe da tomada" />
        <ScrollView contentContainerClassName={deviceDetailClasses.content} showsVerticalScrollIndicator={false}>
          <DeviceNotFoundState onBack={() => navigation.navigate(PrivateRoutes.DEVICES)} />
        </ScrollView>
      </View>
    );
  }

  const isOffline = device.status === 'offline';

  return (
    <View className="flex-1 bg-[#F9F8FF]">
      <ScreenHeader
        onBack={() => navigation.goBack()}
        rightElement={<MoreVertical color={colors.text} size={21} />}
        subtitle={device.room}
        title={device.name}
      />
      <ScrollView contentContainerClassName={deviceDetailClasses.content} showsVerticalScrollIndicator={false}>
        <DeviceStatusCard device={device} />
        {isOffline ? <OfflineDeviceDetailNotice /> : null}
        <CurrentDeviceConsumptionCard device={device} />
        <DeviceDailySummaryCards today={device.today} />
        <DeviceRecentConsumptionChart data={device.recentChart} />
        <DeviceAlertsSection alerts={device.alerts} />
        <DeviceRecommendationCard recommendation={device.recommendation} />
        <DeviceActionsList isOffline={isOffline} />
      </ScrollView>
    </View>
  );
}
