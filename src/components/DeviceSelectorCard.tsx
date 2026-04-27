import { ChevronDown, PlugZap, Wifi, WifiOff } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, radius, spacing } from '../theme/theme';
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
    <Card style={styles.card}>
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.78}
        disabled={!canOpen}
        onPress={() => setIsOpen((currentValue) => !currentValue)}
        style={styles.selectedRow}
      >
        <View style={styles.deviceIcon}>
          <PlugZap color={palette.primary} size={22} />
        </View>
        <View style={styles.deviceContent}>
          <View style={styles.deviceTitleRow}>
            <Text style={styles.deviceName}>{selectedDevice.name}</Text>
            {canOpen ? (
              <Animated.View
                style={[
                  styles.chevron,
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
          <Text style={styles.deviceRoom}>{selectedDevice.room}</Text>
        </View>
        <View style={[styles.statusPill, isOnline ? styles.onlinePill : styles.offlinePill]}>
          {isOnline ? <Wifi color={palette.success} size={13} /> : <WifiOff color={colors.danger} size={13} />}
          <Text style={[styles.statusText, isOnline ? styles.onlineText : styles.offlineText]}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>
      </TouchableOpacity>

      {shouldRenderDropdown ? (
        <Animated.View
          style={[
            styles.dropdown,
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
                style={[styles.option, selected && styles.optionSelected]}
              >
                <View style={[styles.optionDot, optionOnline ? styles.optionDotOnline : styles.optionDotOffline]} />
                <View style={styles.optionContent}>
                  <Text style={styles.optionName}>{device.name}</Text>
                  <Text style={styles.optionRoom}>{device.room}</Text>
                </View>
                <Text style={[styles.optionStatus, optionOnline ? styles.onlineText : styles.offlineText]}>
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
  primarySoft: '#EEF3FF',
  success: '#13A36F'
};

const styles = StyleSheet.create({
  card: {
    borderColor: '#E8ECFF',
    borderRadius: radius.xl,
    gap: spacing.sm
  },
  chevron: {
    height: 18,
    width: 18
  },
  deviceContent: {
    flex: 1
  },
  deviceIcon: {
    alignItems: 'center',
    backgroundColor: palette.primarySoft,
    borderRadius: radius.lg,
    height: 44,
    justifyContent: 'center',
    width: 44
  },
  deviceName: {
    color: colors.text,
    flexShrink: 1,
    fontSize: 17,
    fontWeight: '900'
  },
  deviceRoom: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2
  },
  deviceTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs
  },
  dropdown: {
    borderTopColor: '#EEF1FF',
    borderTopWidth: 1,
    gap: spacing.xs,
    overflow: 'hidden',
    paddingTop: spacing.sm
  },
  offlinePill: {
    backgroundColor: '#FFECEC'
  },
  offlineText: {
    color: colors.danger
  },
  onlinePill: {
    backgroundColor: '#E9FFF5'
  },
  onlineText: {
    color: palette.success
  },
  option: {
    alignItems: 'center',
    borderRadius: radius.lg,
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 50,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm
  },
  optionContent: {
    flex: 1
  },
  optionDot: {
    borderRadius: 999,
    height: 10,
    width: 10
  },
  optionDotOffline: {
    backgroundColor: colors.outline
  },
  optionDotOnline: {
    backgroundColor: palette.success
  },
  optionName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900'
  },
  optionRoom: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2
  },
  optionSelected: {
    backgroundColor: palette.primarySoft
  },
  optionStatus: {
    fontSize: 12,
    fontWeight: '900'
  },
  selectedRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm
  },
  statusPill: {
    alignItems: 'center',
    borderRadius: 999,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  statusText: {
    fontSize: 12,
    fontWeight: '900'
  }
});
