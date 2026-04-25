import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Card } from '../components/Card';
import { weeklyConsumption } from '../data/energy';
import { colors, radius, spacing } from '../theme/theme';

export function UsageScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Consumo em tempo real</Text>
      <Card style={styles.hero}>
        <Text style={styles.heroLabel}>Agora</Text>
        <Text style={styles.heroValue}>1,42 kW</Text>
        <Text style={styles.heroBody}>Sala, cozinha e lavanderia estao ativos neste momento.</Text>
      </Card>

      {weeklyConsumption.map((item) => (
        <Card key={item.day} style={styles.row}>
          <View>
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.detail}>Consumo diario medido</Text>
          </View>
          <Text style={styles.kwh}>{item.kwh.toFixed(1)} kWh</Text>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
    padding: spacing.md,
    paddingBottom: spacing.xl
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    paddingTop: spacing.sm
  },
  hero: {
    backgroundColor: colors.secondarySoft
  },
  heroLabel: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: '800'
  },
  heroValue: {
    color: colors.text,
    fontSize: 44,
    fontWeight: '900',
    marginTop: spacing.xs
  },
  heroBody: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.sm
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  day: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800'
  },
  detail: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: spacing.xs
  },
  kwh: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  }
});
