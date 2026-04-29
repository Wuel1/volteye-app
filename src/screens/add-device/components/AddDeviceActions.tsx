import { Pressable, Text, View } from 'react-native';

import { addDeviceClasses } from '../styles';

export function AddDeviceActions({
  onCancel,
  onStartPairing
}: {
  onCancel: () => void;
  onStartPairing: () => void;
}) {
  return (
    <View className="gap-3">
      <Pressable accessibilityRole="button" className={addDeviceClasses.actionButton} onPress={onStartPairing}>
        <Text className={addDeviceClasses.actionButtonText}>Iniciar pareamento</Text>
      </Pressable>
      <Pressable accessibilityRole="button" className={addDeviceClasses.cancelButton} onPress={onCancel}>
        <Text className={addDeviceClasses.cancelButtonText}>Cancelar</Text>
      </Pressable>
    </View>
  );
}
