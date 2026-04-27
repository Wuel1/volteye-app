import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../theme/theme';
import { Card } from './Card';

type SummaryCardProps = {
  helper: string;
  icon: ReactNode;
  iconBackgroundColor?: string;
  label: string;
  value: string;
};

export function SummaryCard({
  helper,
  icon,
  iconBackgroundColor = '#EEF3FF',
  label,
  value
}: SummaryCardProps) {
  return (
    <Card style={styles.card}>
      <View style={[styles.icon, { backgroundColor: iconBackgroundColor }]}>{icon}</View>
      <View style={styles.text}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.helper}>{helper}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderColor: '#EEF1FF',
    borderRadius: radius.xl,
    flexDirection: 'row',
    gap: spacing.md
  },
  helper: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2
  },
  icon: {
    alignItems: 'center',
    borderRadius: radius.lg,
    height: 44,
    justifyContent: 'center',
    width: 44
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  text: {
    flex: 1
  },
  value: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 2
  }
});
