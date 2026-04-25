import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../theme/theme';

export type TabKey = 'home' | 'usage' | 'alerts' | 'profile';

type TabItem = {
  key: TabKey;
  label: string;
};

type TabBarProps = {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
};

const tabs: TabItem[] = [
  { key: 'home', label: 'Inicio' },
  { key: 'usage', label: 'Consumo' },
  { key: 'alerts', label: 'Alertas' },
  { key: 'profile', label: 'Perfil' }
];

export function TabBar({ activeTab, onChange }: TabBarProps) {
  return (
    <View style={styles.wrapper}>
      {tabs.map((tab) => {
        const active = tab.key === activeTab;

        return (
          <Pressable
            accessibilityRole="button"
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={[styles.tab, active && styles.activeTab]}
          >
            <View style={[styles.dot, active && styles.activeDot]} />
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
    justifyContent: 'center'
  },
  activeTab: {
    backgroundColor: colors.primarySoft
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
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700'
  },
  activeLabel: {
    color: colors.primary
  }
});
