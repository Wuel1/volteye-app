import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';

import { ConsumptionPeriodKey } from '../../../data/energy';
import { spacing } from '../../../theme/theme';
import { usageClasses } from '../styles';

const periodTabs: { key: ConsumptionPeriodKey; label: string }[] = [
  { key: 'today', label: 'Hoje' },
  { key: 'week', label: 'Semana' },
  { key: 'month', label: 'Mes' }
];

export function PeriodFilterTabs({
  onSelectPeriod,
  selectedPeriod
}: {
  onSelectPeriod: (period: ConsumptionPeriodKey) => void;
  selectedPeriod: ConsumptionPeriodKey;
}) {
  const [containerWidth, setContainerWidth] = useState(0);
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const selectedIndex = periodTabs.findIndex((tab) => tab.key === selectedPeriod);
  const tabGap = spacing.xs;
  const tabWidth = containerWidth ? (containerWidth - spacing.xs * 2 - tabGap * (periodTabs.length - 1)) / periodTabs.length : 0;

  useEffect(() => {
    if (!tabWidth) {
      return;
    }

    Animated.timing(indicatorPosition, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
      toValue: spacing.xs + selectedIndex * (tabWidth + tabGap),
      useNativeDriver: true
    }).start();
  }, [indicatorPosition, selectedIndex, tabGap, tabWidth]);

  return (
    <View className={usageClasses.periodTabs} onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}>
      {tabWidth ? (
        <Animated.View
          pointerEvents="none"
          className={usageClasses.periodIndicator}
          style={{
            width: tabWidth,
            transform: [{ translateX: indicatorPosition }]
          }}
        />
      ) : null}
      {periodTabs.map((tab) => {
        const isActive = selectedPeriod === tab.key;

        return (
          <Pressable
            accessibilityRole="button"
            key={tab.key}
            onPress={() => onSelectPeriod(tab.key)}
            className={usageClasses.periodTab}
          >
            <Text className={`${usageClasses.periodTabText} ${isActive ? usageClasses.periodTabTextActive : ''}`}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
