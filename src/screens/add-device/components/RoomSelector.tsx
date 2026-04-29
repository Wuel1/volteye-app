import { Pressable, Text, View } from 'react-native';

import { addDeviceClasses, addDevicePalette } from '../styles';

const roomOptions = ['Sala', 'Quarto', 'Cozinha', 'Escritorio', 'Comercio', 'Outro'];

export function RoomSelector({
  error,
  onSelectRoom,
  selectedRoom
}: {
  error?: string;
  onSelectRoom: (room: string) => void;
  selectedRoom: string;
}) {
  return (
    <View className={addDeviceClasses.fieldCard}>
      <Text className={addDeviceClasses.fieldLabel}>Ambiente</Text>
      <View className={addDeviceClasses.roomGrid}>
        {roomOptions.map((room) => {
          const isSelected = selectedRoom === room;

          return (
            <Pressable
              accessibilityRole="button"
              className={addDeviceClasses.roomChip}
              key={room}
              onPress={() => onSelectRoom(room)}
              style={
                isSelected
                  ? {
                      backgroundColor: addDevicePalette.primary,
                      borderColor: addDevicePalette.primary
                    }
                  : undefined
              }
            >
              <Text className={addDeviceClasses.roomChipText} style={isSelected ? { color: '#FFFFFF' } : undefined}>
                {room}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {error ? <Text className={addDeviceClasses.errorText}>{error}</Text> : null}
    </View>
  );
}
