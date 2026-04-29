import { WifiOff } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { colors } from '../../../theme/theme';
import { alertsClasses } from '../styles';

export function OfflineDeviceNotice() {
  return (
    <Card className={alertsClasses.offlineNotice}>
      <WifiOff color={colors.warning} size={20} />
      <View className={alertsClasses.offlineNoticeText}>
        <Text className={alertsClasses.offlineNoticeTitle}>A tomada esta offline no momento</Text>
        <Text className={alertsClasses.offlineNoticeBody}>
          Alguns alertas podem ficar indisponiveis ate a conexao ser restabelecida.
        </Text>
      </View>
    </Card>
  );
}
