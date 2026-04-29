import { Wifi } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { addDeviceClasses, addDevicePalette } from '../styles';

export function WifiInfoNotice() {
  return (
    <Card className={addDeviceClasses.infoNotice}>
      <Wifi color={addDevicePalette.primary} size={21} />
      <Text className={addDeviceClasses.infoText}>
        Para configurar a tomada, use uma rede Wi-Fi estavel. Se a conexao falhar, tente usar a rede principal da sua casa.
      </Text>
    </Card>
  );
}
