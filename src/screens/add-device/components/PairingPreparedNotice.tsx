import { CheckCircle2 } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { addDeviceClasses, addDevicePalette } from '../styles';

export function PairingPreparedNotice({ deviceName, room }: { deviceName: string; room: string }) {
  return (
    <Card className={addDeviceClasses.preparedNotice}>
      <View className="flex-row items-start gap-3">
        <CheckCircle2 color={addDevicePalette.success} size={22} />
        <Text className={addDeviceClasses.preparedText}>
          Tudo pronto para iniciar o pareamento de {deviceName.trim()} em {room}. A proxima etapa sera conectar a tomada ao Wi-Fi.
        </Text>
      </View>
    </Card>
  );
}
