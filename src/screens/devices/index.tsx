import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenHeader } from '../../components/ScreenHeader';
import { SectionHeader } from '../../components/SectionHeader';
import { PrivateRoutes } from '../../constants/routes';
import { devicesMock } from '../../data/energy';
import { RootStackParamList } from '../../navigation/types';
import { AddDeviceButton } from './components/AddDeviceButton';
import { DeviceCard } from './components/DeviceCard';
import { DeviceFilterKey, DevicesFilterTabs } from './components/DevicesFilterTabs';
import { DevicesSummaryCard } from './components/DevicesSummaryCard';
import { EmptyDevicesState } from './components/EmptyDevicesState';
import { HighestConsumptionCard } from './components/HighestConsumptionCard';
import { devicesClasses } from './styles';

type DevicesScreenProps = NativeStackScreenProps<RootStackParamList, typeof PrivateRoutes.DEVICES>;

export function DevicesScreen({ navigation }: DevicesScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState<DeviceFilterKey>('all');
  const filteredDevices = useMemo(() => {
    if (selectedFilter === 'all') {
      return devicesMock.devices;
    }

    return devicesMock.devices.filter((device) => device.status === selectedFilter);
  }, [selectedFilter]);

  return (
    <View className="flex-1 bg-[#F9F8FF]">
      <ScreenHeader
        onBack={() => navigation.goBack()}
        subtitle="Gerencie os dispositivos conectados ao VoltEye"
        title="Minhas tomadas"
      />
      <ScrollView contentContainerClassName={devicesClasses.content} showsVerticalScrollIndicator={false}>
        {devicesMock.devices.length ? (
          <>
            <DevicesSummaryCard />
            <HighestConsumptionCard />
            <DevicesFilterTabs selectedFilter={selectedFilter} onSelectFilter={setSelectedFilter} />
            <View className="gap-3">
              <SectionHeader title="Tomadas cadastradas" />
              {filteredDevices.map((device) => (
                <DeviceCard
                  device={device}
                  key={device.id}
                  onPress={() =>
                    navigation.navigate(PrivateRoutes.DEVICE_DETAIL, {
                      deviceId: device.id,
                      deviceName: device.name,
                      deviceRoom: device.room
                    })
                  }
                />
              ))}
            </View>
            <AddDeviceButton onPress={() => navigation.navigate(PrivateRoutes.ADD_DEVICE)} />
          </>
        ) : (
          <EmptyDevicesState onAddDevice={() => navigation.navigate(PrivateRoutes.ADD_DEVICE)} />
        )}
      </ScrollView>
    </View>
  );
}
