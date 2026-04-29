import { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

import { AlertFilterKey } from '../../../data/energy';
import { alertsClasses, alertsPalette } from '../styles';

const filterTabs: { key: AlertFilterKey; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'important', label: 'Importantes' },
  { key: 'consumption', label: 'Consumo' },
  { key: 'connection', label: 'Conexao' }
];

export function AlertsFilterTabs({
  onSelectFilter,
  selectedFilter
}: {
  onSelectFilter: (filter: AlertFilterKey) => void;
  selectedFilter: AlertFilterKey;
}) {
  return (
    <View className={alertsClasses.filters}>
      {filterTabs.map((filter) => (
        <AlertFilterChip
          filter={filter}
          isActive={selectedFilter === filter.key}
          key={filter.key}
          onPress={() => onSelectFilter(filter.key)}
        />
      ))}
    </View>
  );
}

function AlertFilterChip({
  filter,
  isActive,
  onPress
}: {
  filter: { key: AlertFilterKey; label: string };
  isActive: boolean;
  onPress: () => void;
}) {
  const activeAnimation = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(activeAnimation, {
      damping: 16,
      mass: 0.7,
      stiffness: 180,
      toValue: isActive ? 1 : 0,
      useNativeDriver: true
    }).start();
  }, [activeAnimation, isActive]);

  return (
    <Animated.View
      style={{
        opacity: activeAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.86, 1]
        }),
        transform: [
          {
            scale: activeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.04]
            })
          }
        ]
      }}
    >
      <Pressable
        accessibilityRole="button"
        className={alertsClasses.filterChip}
        onPress={onPress}
        style={
          isActive
            ? {
                backgroundColor: alertsPalette.primary,
                borderColor: alertsPalette.primary
              }
            : undefined
        }
      >
        <Text className={alertsClasses.filterChipText} style={isActive ? { color: '#FFFFFF' } : undefined}>
          {filter.label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
