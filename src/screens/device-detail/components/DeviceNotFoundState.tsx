import { PlugZap } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { colors } from '../../../theme/theme';
import { deviceDetailClasses, deviceDetailPalette } from '../styles';

export function DeviceNotFoundState({ onBack }: { onBack: () => void }) {
  return (
    <Card className={deviceDetailClasses.emptyCard}>
      <View className={deviceDetailClasses.emptyIcon}>
        <PlugZap color={deviceDetailPalette.primary} size={34} />
      </View>
      <Text className={deviceDetailClasses.emptyTitle}>Tomada nao encontrada</Text>
      <Text className={deviceDetailClasses.emptyText}>Nao conseguimos encontrar esse dispositivo.</Text>
      <Pressable accessibilityRole="button" className="mt-6 rounded-2xl bg-[#4880FF] px-5 py-3" onPress={onBack}>
        <Text className="text-sm font-black text-surface">Voltar para minhas tomadas</Text>
      </Pressable>
    </Card>
  );
}
