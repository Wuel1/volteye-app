import { Pressable, Text, View } from 'react-native';

import { DeviceManagementStatus } from '../../../data/energy';
import { devicesClasses } from '../styles';

export type DeviceFilterKey = 'all' | DeviceManagementStatus;

const filterTabs: { key: DeviceFilterKey; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'online', label: 'Online' },
  { key: 'offline', label: 'Offline' }
];

export function DevicesFilterTabs({
  onSelectFilter,
  selectedFilter
}: {
  onSelectFilter: (filter: DeviceFilterKey) => void;
  selectedFilter: DeviceFilterKey;
}) {
  return (
    <View className={devicesClasses.filters}>
      {filterTabs.map((filter) => {
        const isActive = selectedFilter === filter.key;

        return (
          <Pressable
            accessibilityRole="button"
            className={`${devicesClasses.filterChip} ${isActive ? devicesClasses.filterChipActive : ''}`}
            key={filter.key}
            onPress={() => onSelectFilter(filter.key)}
          >
            <Text className={`${devicesClasses.filterChipText} ${isActive ? devicesClasses.filterChipTextActive : ''}`}>
              {filter.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
