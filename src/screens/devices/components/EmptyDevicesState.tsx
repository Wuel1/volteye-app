import { Search } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { AddDeviceButton } from './AddDeviceButton';
import { devicesClasses, devicesPalette } from '../styles';

export function EmptyDevicesState() {
  return (
    <Card className={devicesClasses.emptyCard}>
      <View className={devicesClasses.emptyIcon}>
        <Search color={devicesPalette.primary} size={34} />
      </View>
      <Text className={devicesClasses.emptyTitle}>Nenhuma tomada conectada</Text>
      <Text className={devicesClasses.emptyText}>
        Adicione sua primeira tomada inteligente para comecar a acompanhar seu consumo.
      </Text>
      <AddDeviceButton />
    </Card>
  );
}
