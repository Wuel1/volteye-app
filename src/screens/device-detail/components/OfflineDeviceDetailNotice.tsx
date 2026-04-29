import { WifiOff } from 'lucide-react-native';
import { Pressable, Text } from 'react-native';

import { Card } from '../../../components/Card';
import { colors } from '../../../theme/theme';
import { deviceDetailClasses } from '../styles';

export function OfflineDeviceDetailNotice() {
  return (
    <Card className={deviceDetailClasses.offlineNotice}>
      <WifiOff color={colors.warning} size={22} />
      <Text className={deviceDetailClasses.offlineTitle}>Tomada offline</Text>
      <Text className={deviceDetailClasses.offlineText}>
        Nao estamos recebendo dados em tempo real agora. Os dados abaixo sao da ultima sincronizacao.
      </Text>
      <Pressable accessibilityRole="button" className={deviceDetailClasses.offlineButton}>
        <Text className={deviceDetailClasses.offlineButtonText}>Verificar conexao</Text>
      </Pressable>
    </Card>
  );
}
