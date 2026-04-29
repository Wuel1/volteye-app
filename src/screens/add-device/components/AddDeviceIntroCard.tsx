import { PlugZap } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { addDeviceClasses } from '../styles';

export function AddDeviceIntroCard() {
  return (
    <Card className={addDeviceClasses.introCard}>
      <View className={addDeviceClasses.introIcon}>
        <PlugZap color="#FFFFFF" size={26} />
      </View>
      <Text className={addDeviceClasses.introTitle}>Cadastre sua tomada</Text>
      <Text className={addDeviceClasses.introDescription}>
        De um nome para identificar o dispositivo e escolha onde ele sera usado. Depois, vamos conectar a tomada ao Wi-Fi.
      </Text>
    </Card>
  );
}
