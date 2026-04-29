import { Plus, PlugZap } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { colors } from '../../../theme/theme';
import { homeClasses, homePalette } from '../styles';

export function EmptyDeviceState({ onAddDevice }: { onAddDevice?: () => void }) {
  return (
    <Card className={homeClasses.emptyCard}>
      <View className={homeClasses.emptyIcon}>
        <PlugZap color={homePalette.primary} size={34} />
      </View>
      <Text className={homeClasses.emptyTitle}>Nenhuma tomada conectada</Text>
      <Text className={homeClasses.emptyText}>
        Adicione sua primeira tomada inteligente para comecar a acompanhar seu consumo.
      </Text>
      <Pressable accessibilityRole="button" className={homeClasses.primaryButton} onPress={onAddDevice}>
        <Plus color={colors.surface} size={18} />
        <Text className={homeClasses.primaryButtonText}>Adicionar tomada</Text>
      </Pressable>
    </Card>
  );
}
