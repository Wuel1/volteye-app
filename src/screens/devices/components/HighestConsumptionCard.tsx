import { Text } from 'react-native';

import { Card } from '../../../components/Card';
import { devicesMock } from '../../../data/energy';
import { devicesClasses } from '../styles';

export function HighestConsumptionCard() {
  const onlinePowerTotal = devicesMock.devices.reduce((total, device) => total + device.currentPowerWatts, 0);
  const highestDevice = [...devicesMock.devices].sort((a, b) => b.currentPowerWatts - a.currentPowerWatts)[0];
  const percent = onlinePowerTotal ? Math.round((highestDevice.currentPowerWatts / onlinePowerTotal) * 100) : 0;
  const hasMultipleDevices = devicesMock.devices.length > 1;

  return (
    <Card className={devicesClasses.highlightCard}>
      <Text className={devicesClasses.highlightLabel}>Maior consumo agora</Text>
      <Text className={devicesClasses.highlightTitle}>{highestDevice.name}</Text>
      <Text className={devicesClasses.highlightBody}>
        {hasMultipleDevices
          ? `${highestDevice.name} representa ${percent}% do consumo atual monitorado.`
          : 'Esta e sua tomada monitorada no momento.'}
      </Text>
    </Card>
  );
}
