import { Plus } from 'lucide-react-native';
import { Pressable, Text } from 'react-native';

import { colors } from '../../../theme/theme';
import { devicesClasses } from '../styles';

export function AddDeviceButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" className={devicesClasses.addButton} onPress={onPress}>
      <Plus color={colors.surface} size={19} />
      <Text className={devicesClasses.addButtonText}>Adicionar tomada</Text>
    </Pressable>
  );
}
