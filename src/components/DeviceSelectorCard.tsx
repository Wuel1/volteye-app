import { ChevronDown, PlugZap, Wifi, WifiOff } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

import { colors, spacing } from '../theme/theme';
import { Card } from './Card';

export type SelectorDevice = {
  id: string;
  name: string;
  room: string;
  status: 'online' | 'offline';
};

type DeviceSelectorCardProps<TDevice extends SelectorDevice> = {
  devices: readonly TDevice[];
  onSelectDevice: (device: TDevice) => void;
  selectedDevice: TDevice;
};

export function DeviceSelectorCard<TDevice extends SelectorDevice>({
  devices,
  onSelectDevice,
  selectedDevice
}: DeviceSelectorCardProps<TDevice>) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRenderDropdown, setShouldRenderDropdown] = useState(false);
  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  const isOnline = selectedDevice.status === 'online';
  const canOpen = devices.length > 1;
  const dropdownMaxHeight = devices.length * 58 + spacing.sm;

  useEffect(() => {
    if (isOpen) {
      setShouldRenderDropdown(true);
    }

    Animated.timing(dropdownAnimation, {
      duration: 180,
      toValue: isOpen ? 1 : 0,
      useNativeDriver: false
    }).start(({ finished }) => {
      if (finished && !isOpen) {
        setShouldRenderDropdown(false);
      }
    });
  }, [dropdownAnimation, isOpen]);

  function handleSelectDevice(device: TDevice) {
    onSelectDevice(device);
    setIsOpen(false);
  }

  return (
    <Card className="gap-2 rounded-3xl border-[#E8ECFF]">
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.78}
        disabled={!canOpen}
        onPress={() => setIsOpen((currentValue) => !currentValue)}
        className="flex-row items-center gap-2"
      >
        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF3FF]">
          <PlugZap color={palette.primary} size={22} />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center gap-1">
            <Text className="shrink text-[17px] font-black text-textMain">{selectedDevice.name}</Text>
            {canOpen ? (
              <Animated.View
                style={[
                  { height: 18, width: 18 },
                  {
                    transform: [
                      {
                        rotate: dropdownAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '180deg']
                        })
                      }
                    ]
                  }
                ]}
              >
                <ChevronDown color={colors.textMuted} size={18} />
              </Animated.View>
            ) : null}
          </View>
          <Text className="mt-0.5 text-[13px] font-bold text-textMuted">{selectedDevice.room}</Text>
        </View>
        <View
          className={`flex-row items-center gap-1 rounded-full px-2 py-1 ${
            isOnline ? 'bg-[#E9FFF5]' : 'bg-[#FFECEC]'
          }`}
        >
          {isOnline ? <Wifi color={palette.success} size={13} /> : <WifiOff color={colors.danger} size={13} />}
          <Text className={`text-xs font-black ${isOnline ? 'text-[#13A36F]' : 'text-[#ba1a1a]'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>
      </TouchableOpacity>

      {shouldRenderDropdown ? (
        <Animated.View
          className="gap-1 overflow-hidden border-t border-[#EEF1FF] pt-2"
          style={[
            {
              maxHeight: dropdownAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, dropdownMaxHeight]
              }),
              opacity: dropdownAnimation,
              transform: [
                {
                  translateY: dropdownAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-6, 0]
                  })
                },
                {
                  scale: dropdownAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.98, 1]
                  })
                }
              ]
            }
          ]}
        >
          {devices.map((device) => {
            const selected = device.id === selectedDevice.id;
            const optionOnline = device.status === 'online';

            return (
              <TouchableOpacity
                accessibilityRole="button"
                activeOpacity={0.78}
                key={device.id}
                onPress={() => handleSelectDevice(device)}
                className={`min-h-[50px] flex-row items-center gap-2 rounded-2xl px-2 py-2 ${
                  selected ? 'bg-[#EEF3FF]' : ''
                }`}
              >
                <View className={`h-2.5 w-2.5 rounded-full ${optionOnline ? 'bg-[#13A36F]' : 'bg-outlineSoft'}`} />
                <View className="flex-1">
                  <Text className="text-sm font-black text-textMain">{device.name}</Text>
                  <Text className="mt-0.5 text-xs font-bold text-textMuted">{device.room}</Text>
                </View>
                <Text className={`text-xs font-black ${optionOnline ? 'text-[#13A36F]' : 'text-[#ba1a1a]'}`}>
                  {optionOnline ? 'Online' : 'Offline'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      ) : null}
    </Card>
  );
}

const palette = {
  primary: '#4880FF',
  success: '#13A36F'
};
