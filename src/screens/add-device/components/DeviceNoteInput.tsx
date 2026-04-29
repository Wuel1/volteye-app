import { Text, TextInput, View } from 'react-native';

import { addDeviceClasses } from '../styles';

export function DeviceNoteInput({
  onChangeNote,
  value
}: {
  onChangeNote: (value: string) => void;
  value: string;
}) {
  return (
    <View className={addDeviceClasses.fieldCard}>
      <Text className={addDeviceClasses.fieldLabel}>Observacao</Text>
      <TextInput
        className={addDeviceClasses.noteInput}
        multiline
        onChangeText={onChangeNote}
        placeholder="Ex: ligada ao freezer, TV, computador..."
        placeholderTextColor="#8B94AE"
        textAlignVertical="top"
        value={value}
      />
      <Text className={addDeviceClasses.fieldHelp}>Essa informacao ajuda voce a reconhecer a tomada depois.</Text>
    </View>
  );
}
