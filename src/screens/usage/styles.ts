import { StyleSheet } from 'react-native';

import { colors, radius, spacing } from '../../theme/theme';

export const usagePalette = {
  background: '#F9F8FF',
  primary: '#4880FF',
  primarySoft: '#EEF3FF',
  secondary: '#918BFF',
  secondarySoft: '#F0ECFF',
  text: '#283351',
  success: '#13A36F',
  warning: '#FF8A3D'
};

export const styles = StyleSheet.create({
  bar: {
    borderRadius: radius.lg,
    minHeight: 12,
    width: '100%'
  },
  barGroup: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.xs
  },
  barLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center'
  },
  barTrack: {
    backgroundColor: usagePalette.primarySoft,
    borderRadius: radius.lg,
    height: 126,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    width: '100%'
  },
  barValue: {
    color: usagePalette.text,
    fontSize: 10,
    fontWeight: '900'
  },
  cardEyebrow: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  chart: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: spacing.xs,
    height: 178,
    marginTop: spacing.md
  },
  chartCard: {
    borderColor: '#E8ECFF',
    borderRadius: radius.xl
  },
  comparisonBadge: {
    fontSize: 13,
    fontWeight: '900',
    marginTop: spacing.xs
  },
  comparisonCard: {
    alignItems: 'flex-start',
    borderColor: '#E8ECFF',
    borderRadius: radius.xl,
    flexDirection: 'row',
    gap: spacing.md
  },
  comparisonContent: {
    flex: 1
  },
  comparisonDown: {
    backgroundColor: '#E9FFF5'
  },
  comparisonDownText: {
    color: usagePalette.success
  },
  comparisonIcon: {
    alignItems: 'center',
    borderRadius: radius.lg,
    height: 46,
    justifyContent: 'center',
    width: 46
  },
  comparisonText: {
    color: usagePalette.text,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
    marginTop: spacing.xs
  },
  comparisonUp: {
    backgroundColor: '#FFECEC'
  },
  comparisonUpText: {
    color: colors.danger
  },
  content: {
    backgroundColor: usagePalette.background,
    gap: spacing.md,
    padding: spacing.md,
    paddingBottom: spacing.xl + 92,
    paddingTop: spacing.lg
  },
  deviceLabel: {
    color: usagePalette.primary,
    fontSize: 13,
    fontWeight: '900',
    marginTop: spacing.xs
  },
  emptyCard: {
    alignItems: 'center',
    borderColor: '#E8ECFF',
    borderRadius: radius.xl,
    marginTop: spacing.lg,
    paddingVertical: spacing.xl
  },
  emptyIcon: {
    alignItems: 'center',
    backgroundColor: usagePalette.primarySoft,
    borderRadius: 999,
    height: 72,
    justifyContent: 'center',
    width: 72
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
    marginTop: spacing.sm,
    textAlign: 'center'
  },
  emptyTitle: {
    color: usagePalette.text,
    fontSize: 21,
    fontWeight: '900',
    marginTop: spacing.md,
    textAlign: 'center'
  },
  header: {
    gap: spacing.xs
  },
  insightCard: {
    alignItems: 'flex-start',
    backgroundColor: usagePalette.secondary,
    borderColor: usagePalette.secondary,
    borderRadius: radius.xl,
    flexDirection: 'row',
    gap: spacing.md
  },
  insightContent: {
    flex: 1
  },
  insightIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: radius.lg,
    height: 46,
    justifyContent: 'center',
    width: 46
  },
  insightLabel: {
    color: '#F0ECFF',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  insightText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 23,
    marginTop: spacing.xs
  },
  offlineNotice: {
    alignItems: 'flex-start',
    backgroundColor: '#FFF8EF',
    borderColor: '#FFE2C4',
    borderRadius: radius.xl,
    flexDirection: 'row',
    gap: spacing.sm
  },
  offlineNoticeBody: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
    marginTop: 2
  },
  offlineNoticeText: {
    flex: 1
  },
  offlineNoticeTitle: {
    color: usagePalette.text,
    fontSize: 15,
    fontWeight: '900'
  },
  peakLabel: {
    color: usagePalette.text,
    flex: 1,
    fontSize: 15,
    fontWeight: '800'
  },
  peakRank: {
    alignItems: 'center',
    backgroundColor: usagePalette.primarySoft,
    borderRadius: 999,
    height: 28,
    justifyContent: 'center',
    width: 28
  },
  peakRankText: {
    color: usagePalette.primary,
    fontSize: 12,
    fontWeight: '900'
  },
  peakRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm
  },
  peakValue: {
    color: usagePalette.primary,
    fontSize: 14,
    fontWeight: '900'
  },
  peaksCard: {
    borderColor: '#E8ECFF',
    borderRadius: radius.xl
  },
  peaksList: {
    gap: spacing.md,
    marginTop: spacing.md
  },
  periodTab: {
    alignItems: 'center',
    borderRadius: radius.lg,
    flex: 1,
    justifyContent: 'center',
    minHeight: 42
  },
  periodTabActive: {
    backgroundColor: usagePalette.primary
  },
  periodTabText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '900'
  },
  periodTabTextActive: {
    color: colors.surface
  },
  periodTabs: {
    backgroundColor: colors.surface,
    borderColor: '#E8ECFF',
    borderRadius: radius.xl,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.xs,
    padding: spacing.xs
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21
  },
  summaryGrid: {
    gap: spacing.md
  },
  title: {
    color: usagePalette.text,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36
  }
});
