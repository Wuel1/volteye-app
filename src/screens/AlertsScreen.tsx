import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Card } from '../components/Card';
import { alerts } from '../data/energy';
import { colors, spacing } from '../theme/theme';

const severityColor = {
  danger: colors.danger,
  success: colors.success,
  warning: colors.warning
};

export function AlertsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Alertas e notificacoes</Text>
      {alerts.map((alert) => (
        <Card key={alert.title} style={styles.alert}>
          <View style={[styles.indicator, { backgroundColor: severityColor[alert.severity] }]} />
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>{alert.title}</Text>
            <Text style={styles.alertDescription}>{alert.description}</Text>
          </View>
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
  alert: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md
  },
  indicator: {
    borderRadius: 999,
    height: 14,
    marginTop: spacing.xs,
    width: 14
  },
  alertContent: {
    flex: 1
  },
  alertTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800'
  },
  alertDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.xs
  }
});
