import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../theme/theme';
import { Card } from './Card';

type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
  tone?: 'primary' | 'secondary' | 'success';
};

const toneColors = {
  primary: colors.primary,
  secondary: colors.secondary,
  success: colors.success
};

export function MetricCard({ label, value, helper, tone = 'primary' }: MetricCardProps) {
  return (
    <Card style={styles.metric}>
      <View style={[styles.marker, { backgroundColor: toneColors[tone] }]} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.helper}>{helper}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  metric: {
    flex: 1,
    minWidth: 150,
    position: 'relative'
  },
  marker: {
    borderRadius: radius.sm,
    height: 4,
    marginBottom: spacing.md,
    width: 42
  },
  label: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600'
  },
  value: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    marginTop: spacing.xs
  },
  helper: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.sm
  }
});
