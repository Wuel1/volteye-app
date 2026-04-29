import { Text, TextInput, View } from 'react-native';

import { addDeviceClasses } from '../styles';

export function DeviceNameInput({
  error,
  onChangeName,
  value
}: {
  error?: string;
  onChangeName: (value: string) => void;
  value: string;
}) {
  return (
    <View className={addDeviceClasses.fieldCard}>
      <Text className={addDeviceClasses.fieldLabel}>Nome da tomada</Text>
      <TextInput
        className={addDeviceClasses.fieldInput}
        onChangeText={onChangeName}
        placeholder="Ex: Tomada da sala"
        placeholderTextColor="#8B94AE"
        value={value}
      />
      {error ? <Text className={addDeviceClasses.errorText}>{error}</Text> : null}
    </View>
  );
}
