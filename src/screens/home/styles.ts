import { StyleSheet } from 'react-native';

import { colors, radius, spacing } from '../../theme/theme';

export const homePalette = {
  background: '#F9F8FF',
  primary: '#4880FF',
  primaryDeep: '#283351',
  primarySoft: '#EEF3FF',
  secondary: '#918BFF',
  secondarySoft: '#B8A0FF',
  success: '#13A36F',
  warning: '#FF8A3D'
};

export const styles = StyleSheet.create({
  bar: {
    backgroundColor: homePalette.secondary,
    borderRadius: radius.lg,
    minHeight: 14,
    width: '100%'
  },
  barGroup: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.xs
  },
  barLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800'
  },
  barTrack: {
    backgroundColor: homePalette.primarySoft,
    borderRadius: radius.lg,
    height: 120,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    width: '100%'
  },
  barValue: {
    color: homePalette.primaryDeep,
    fontSize: 11,
    fontWeight: '900'
  },
  chart: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: spacing.sm,
    height: 172,
    marginTop: spacing.md
  },
  chartCard: {
    borderColor: '#E8ECFF',
    borderRadius: radius.xl
  },
  connectionButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.xs
  },
  connectionButtonText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '900'
  },
  consumptionCard: {
    backgroundColor: homePalette.primary,
    borderColor: homePalette.primary,
    borderRadius: radius.xl,
    overflow: 'hidden'
  },
  consumptionFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg
  },
  consumptionLabel: {
    color: '#EAF0FF',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  consumptionStatus: {
    color: colors.surface,
    flex: 1,
    fontSize: 15,
    fontWeight: '900'
  },
  consumptionTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  content: {
    backgroundColor: homePalette.background,
    gap: spacing.md,
    padding: spacing.md,
    paddingBottom: spacing.xl + 92,
    paddingTop: spacing.lg
  },
  deviceCard: {
    alignItems: 'center',
    borderColor: '#E8ECFF',
    borderRadius: radius.xl,
    flexDirection: 'row',
    gap: spacing.sm
  },
  deviceContent: {
    flex: 1
  },
  deviceIcon: {
    alignItems: 'center',
    backgroundColor: homePalette.primarySoft,
    borderRadius: radius.lg,
    height: 44,
    justifyContent: 'center',
    width: 44
  },
  deviceName: {
    color: homePalette.primaryDeep,
    flexShrink: 1,
    fontSize: 17,
    fontWeight: '900'
  },
  deviceRoom: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2
  },
  deviceTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs
  },
  deviceListCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: '#EEF1FF',
    borderRadius: radius.xl,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 78,
    padding: spacing.md,
    shadowColor: homePalette.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 1
  },
  deviceListCardInactive: {
    opacity: 0.58
  },
  deviceListContent: {
    flex: 1
  },
  deviceListIcon: {
    alignItems: 'center',
    backgroundColor: homePalette.primarySoft,
    borderRadius: 999,
    height: 48,
    justifyContent: 'center',
    width: 48
  },
  deviceListIconInactive: {
    backgroundColor: '#EEF0F7'
  },
  deviceListName: {
    color: homePalette.primaryDeep,
    fontSize: 16,
    fontWeight: '900'
  },
  deviceListNameInactive: {
    color: colors.textMuted
  },
  deviceListStatus: {
    fontSize: 13,
    fontWeight: '900',
    marginTop: 2
  },
  deviceListStatusOffline: {
    color: colors.textMuted
  },
  deviceListStatusOnline: {
    color: homePalette.success
  },
  devicesList: {
    gap: spacing.md
  },
  devicesSection: {
    gap: spacing.md,
    position: 'relative'
  },
  emptyCard: {
    alignItems: 'center',
    borderColor: '#E8ECFF',
    borderRadius: radius.xl,
    marginTop: spacing.lg,
    paddingVertical: spacing.xl
  },
  floatingAddButton: {
    alignItems: 'center',
    backgroundColor: homePalette.secondary,
    borderRadius: radius.md,
    bottom: spacing.md,
    height: 38,
    justifyContent: 'center',
    position: 'absolute',
    right: spacing.md,
    shadowColor: homePalette.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    width: 38,
    elevation: 3
  },
  emptyIcon: {
    alignItems: 'center',
    backgroundColor: homePalette.primarySoft,
    borderRadius: 999,
    height: 76,
    justifyContent: 'center',
    width: 76
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
    marginTop: spacing.sm,
    maxWidth: 280,
    textAlign: 'center'
  },
  emptyTitle: {
    color: homePalette.primaryDeep,
    fontSize: 22,
    fontWeight: '900',
    marginTop: spacing.md,
    textAlign: 'center'
  },
  greeting: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700'
  },
  healthOffline: {
    backgroundColor: '#FFECEC'
  },
  healthOfflineText: {
    color: colors.danger
  },
  healthOk: {
    backgroundColor: colors.surface
  },
  healthPill: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 999,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  healthText: {
    color: homePalette.primary,
    fontSize: 12,
    fontWeight: '900'
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between'
  },
  headerText: {
    flex: 1
  },
  headerTitle: {
    color: homePalette.primaryDeep,
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 31,
    marginTop: spacing.xs
  },
  infoBody: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
    marginTop: spacing.xs
  },
  infoCard: {
    alignItems: 'flex-start',
    borderColor: '#E8ECFF',
    borderLeftColor: homePalette.primary,
    borderLeftWidth: 4,
    borderRadius: radius.xl,
    flexDirection: 'row',
    gap: spacing.md
  },
  infoContent: {
    flex: 1
  },
  infoIcon: {
    alignItems: 'center',
    backgroundColor: homePalette.primarySoft,
    borderRadius: radius.lg,
    height: 44,
    justifyContent: 'center',
    width: 44
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  infoTitle: {
    color: homePalette.primaryDeep,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2
  },
  insightBody: {
    color: '#F6F3FF',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
    marginTop: spacing.xs
  },
  insightCard: {
    backgroundColor: homePalette.secondary,
    borderColor: homePalette.secondary,
    borderRadius: radius.xl
  },
  insightLabel: {
    color: '#F0ECFF',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  insightTitle: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '900',
    marginTop: spacing.xs
  },
  lastUpdate: {
    color: '#EAF0FF',
    fontSize: 13,
    fontWeight: '700',
    marginTop: spacing.xs
  },
  miniBar: {
    borderRadius: radius.md,
    flex: 1,
    minHeight: 22
  },
  miniBars: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: spacing.sm,
    height: 104,
    marginTop: spacing.lg
  },
  normalIndicator: {
    backgroundColor: '#A8FFD8',
    borderRadius: 999,
    height: 10,
    width: 10
  },
  offlineBody: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19
  },
  offlineCard: {
    alignItems: 'flex-start',
    backgroundColor: '#FFF6F6',
    borderColor: '#FFDADA',
    borderRadius: radius.xl,
    gap: spacing.sm
  },
  offlineContent: {
    gap: spacing.xs
  },
  offlinePill: {
    backgroundColor: '#FFECEC'
  },
  offlineText: {
    color: colors.danger
  },
  offlineTitle: {
    color: homePalette.primaryDeep,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22
  },
  onlinePill: {
    backgroundColor: '#E9FFF5'
  },
  onlineText: {
    color: homePalette.success
  },
  powerRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginTop: spacing.xs
  },
  powerUnit: {
    color: '#EAF0FF',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 9,
    marginLeft: spacing.xs
  },
  powerValue: {
    color: colors.surface,
    fontSize: 58,
    fontWeight: '900',
    lineHeight: 64
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: homePalette.primary,
    borderRadius: radius.lg,
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '900'
  },
  profileButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: '#E5EAFF',
    borderRadius: 999,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    shadowColor: homePalette.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    width: 48,
    elevation: 2
  },
  quickAction: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: '#E8ECFF',
    borderRadius: radius.lg,
    borderWidth: 1,
    flexBasis: '46%',
    flexDirection: 'row',
    flexGrow: 1,
    gap: spacing.sm,
    minHeight: 64,
    padding: spacing.md,
    shadowColor: homePalette.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 1
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md
  },
  quickIcon: {
    alignItems: 'center',
    backgroundColor: homePalette.primarySoft,
    borderRadius: radius.md,
    height: 34,
    justifyContent: 'center',
    width: 34
  },
  quickLabel: {
    color: homePalette.primaryDeep,
    flex: 1,
    fontSize: 13,
    fontWeight: '900'
  },
  quickSection: {
    gap: spacing.md
  },
  statusPill: {
    alignItems: 'center',
    borderRadius: 999,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  statusText: {
    fontSize: 12,
    fontWeight: '900'
  },
  summaryGrid: {
    gap: spacing.md
  }
});
