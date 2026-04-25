import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Card } from '../components/Card';
import { MetricCard } from '../components/MetricCard';
import { weeklyConsumption } from '../data/energy';
import { colors, radius, spacing } from '../theme/theme';

const maxKwh = Math.max(...weeklyConsumption.map((item) => item.kwh));

export function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>VoltEye</Text>
          <Text style={styles.title}>Controle de energia residencial</Text>
        </View>
        <Image source={require('../../assets/volteye-logo.png')} style={styles.logo} />
      </View>

      <View style={styles.metrics}>
        <MetricCard label="Consumo hoje" value="7,8 kWh" helper="14% abaixo da media" tone="primary" />
        <MetricCard label="Economia mensal" value="R$ 42" helper="Meta em progresso" tone="success" />
      </View>

      <Card>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Semana atual</Text>
          <Text style={styles.cardAction}>68,4 kWh</Text>
        </View>
        <View style={styles.chart}>
          {weeklyConsumption.map((item) => (
            <View key={item.day} style={styles.barGroup}>
              <View style={styles.barTrack}>
                <View style={[styles.bar, { height: `${(item.kwh / maxKwh) * 100}%` }]} />
              </View>
              <Text style={styles.barLabel}>{item.day}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card style={styles.highlight}>
        <Text style={styles.highlightLabel}>Insight rapido</Text>
        <Text style={styles.highlightTitle}>O ar-condicionado concentra o maior impacto no horario de pico.</Text>
        <Text style={styles.highlightBody}>
          Ajustar a temperatura em 1 grau pode reduzir o consumo estimado da noite em ate 9%.
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
    padding: spacing.md,
    paddingBottom: spacing.xl + 88,
    paddingTop: spacing.lg
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between'
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
    maxWidth: 260,
    marginTop: spacing.xs
  },
  logo: {
    borderRadius: radius.lg,
    height: 62,
    width: 62
  },
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800'
  },
  cardAction: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '800'
  },
  chart: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: spacing.sm,
    height: 170
  },
  barGroup: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm
  },
  barTrack: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.lg,
    height: 130,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    width: '100%'
  },
  bar: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    minHeight: 16,
    width: '100%'
  },
  barLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700'
  },
  highlight: {
    backgroundColor: colors.primary
  },
  highlightLabel: {
    color: colors.primarySoft,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase'
  },
  highlightTitle: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
    marginTop: spacing.sm
  },
  highlightBody: {
    color: colors.primarySoft,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm
  }
});
