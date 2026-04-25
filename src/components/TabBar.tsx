import { Bell, Home, LineChart, User } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, spacing } from '../theme/theme';

export type TabKey = 'home' | 'usage' | 'alerts' | 'profile';

type TabItem = {
  Icon: typeof Home;
  key: TabKey;
  label: string;
};

type TabBarProps = {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
};

const tabs: TabItem[] = [
  { Icon: Home, key: 'home', label: 'Inicio' },
  { Icon: LineChart, key: 'usage', label: 'Consumo' },
  { Icon: Bell, key: 'alerts', label: 'Alertas' },
  { Icon: User, key: 'profile', label: 'Perfil' }
];

export function TabBar({ activeTab, onChange }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const activeIndex = tabs.findIndex((tab) => tab.key === activeTab);
  const tabGap = spacing.xs;
  const tabWidth = barWidth ? (barWidth - spacing.xs * 2 - tabGap * (tabs.length - 1)) / tabs.length : 0;

  useEffect(() => {
    if (!tabWidth) {
      return;
    }

    Animated.timing(indicatorPosition, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
      toValue: spacing.xs + activeIndex * (tabWidth + tabGap),
      useNativeDriver: true
    }).start();
  }, [activeIndex, indicatorPosition, tabGap, tabWidth]);

  return (
    <View
      onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}
      style={[styles.wrapper, { marginBottom: Math.max(insets.bottom - spacing.md, spacing.xs) }]}
    >
      {tabWidth ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.indicator,
            {
              width: tabWidth,
              transform: [{ translateX: indicatorPosition }]
            }
          ]}
        />
      ) : null}
      {tabs.map((tab) => {
        const active = tab.key === activeTab;
        const iconColor = active ? colors.primary : colors.textMuted;
        const Icon = tab.Icon;

        return (
          <Pressable
            accessibilityRole="button"
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={styles.tab}
          >
            <View style={[styles.dot, active && styles.activeDot]} />
            <Icon color={iconColor} size={20} strokeWidth={active ? 2.6 : 2.2} />
            <Text style={[styles.label, active && styles.activeLabel]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surface,
    borderColor: colors.outline,
    borderRadius: radius.xl,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.xs,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    padding: spacing.xs
  },
  tab: {
    alignItems: 'center',
    borderRadius: radius.lg,
    flex: 1,
    gap: spacing.xs,
    minHeight: 54,
    justifyContent: 'center',
    zIndex: 1
  },
  dot: {
    backgroundColor: colors.outline,
    borderRadius: 999,
    height: 6,
    width: 6
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 22
  },
  indicator: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.lg,
    bottom: spacing.xs,
    left: 0,
    position: 'absolute',
    top: spacing.xs
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700'
  },
  activeLabel: {
    color: colors.primary
  }
});
