import { Bluetooth, PlugZap, Smartphone, Wifi } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { addDeviceClasses, addDevicePalette } from '../styles';

const preparationSteps = [
  {
    Icon: PlugZap,
    text: 'Conecte a tomada na energia.'
  },
  {
    Icon: Smartphone,
    text: 'Aproxime seu celular da tomada.'
  },
  {
    Icon: Wifi,
    text: 'Verifique se o Wi-Fi esta ligado.'
  },
  {
    Icon: Bluetooth,
    text: 'Mantenha a tomada em modo de pareamento.'
  }
];

export function PairingPreparationCard() {
  return (
    <Card className={addDeviceClasses.preparationCard}>
      <Text className={addDeviceClasses.sectionTitle}>Antes de comecar</Text>
      <View className={addDeviceClasses.preparationList}>
        {preparationSteps.map(({ Icon, text }, index) => (
          <View className={addDeviceClasses.preparationStep} key={text}>
            <View className={addDeviceClasses.preparationStepIcon}>
              <Icon color={index === 0 ? addDevicePalette.primary : addDevicePalette.secondary} size={18} />
            </View>
            <Text className={addDeviceClasses.preparationStepText}>{text}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}
