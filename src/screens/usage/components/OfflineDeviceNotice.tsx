import { AlertCircle } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { colors } from '../../../theme/theme';
import { usageClasses } from '../styles';

export function OfflineDeviceNotice() {
  return (
    <Card className={usageClasses.offlineNotice}>
      <AlertCircle color={colors.warning} size={20} />
      <View className={usageClasses.offlineNoticeText}>
        <Text className={usageClasses.offlineNoticeTitle}>A tomada esta offline no momento</Text>
        <Text className={usageClasses.offlineNoticeBody}>Os dados exibidos sao do ultimo periodo sincronizado.</Text>
      </View>
    </Card>
  );
}
