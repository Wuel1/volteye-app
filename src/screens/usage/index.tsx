import {
  Activity,
  AlertCircle,
  BarChart3,
  Clock3,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Zap
} from 'lucide-react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Pressable, ScrollView, Text, View } from 'react-native';

import { Card } from '../../components/Card';
import { DeviceSelectorCard } from '../../components/DeviceSelectorCard';
import { SectionHeader } from '../../components/SectionHeader';
import { SummaryCard } from '../../components/SummaryCard';
import { consumptionMock, ConsumptionPeriod, ConsumptionPeriodKey } from '../../data/energy';
import { spacing } from '../../theme/theme';
import { colors } from '../../theme/theme';
import { usageClasses, usagePalette } from './styles';

const periodTabs: { key: ConsumptionPeriodKey; label: string }[] = [
  { key: 'today', label: 'Hoje' },
  { key: 'week', label: 'Semana' },
  { key: 'month', label: 'Mes' }
];

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency'
});

export function UsageScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<ConsumptionPeriodKey>('today');
  const [selectedDeviceId, setSelectedDeviceId] = useState(consumptionMock.selectedDevice?.id);
  const periodData = consumptionMock.periods[selectedPeriod];
  const device = consumptionMock.devices.find((item) => item.id === selectedDeviceId) ?? consumptionMock.selectedDevice;
  const hasConsumptionData = periodData.chart.length > 0;
  const maxChartValue = useMemo(
    () => Math.max(...periodData.chart.map((item) => item.value), 1),
    [periodData.chart]
  );

  if (!device || !hasConsumptionData) {
    return (
      <ScrollView contentContainerClassName={usageClasses.content} showsVerticalScrollIndicator={false}>
        <ConsumptionHeader />
        <EmptyConsumptionState />
      </ScrollView>
    );
  }

  const isOffline = device.status === 'offline';

  return (
    <ScrollView contentContainerClassName={usageClasses.content} showsVerticalScrollIndicator={false}>
      <ConsumptionHeader deviceLabel={`${device.name} - ${device.room}`} />
      <DeviceSelectorCard
        devices={consumptionMock.devices}
        onSelectDevice={(selectedDevice) => setSelectedDeviceId(selectedDevice.id)}
        selectedDevice={device}
      />
      {isOffline ? <OfflineDeviceNotice /> : null}
      <PeriodFilterTabs selectedPeriod={selectedPeriod} onSelectPeriod={setSelectedPeriod} />
      <ConsumptionSummaryCards periodData={periodData} />
      <ConsumptionChart maxValue={maxChartValue} periodData={periodData} />
      <ComparisonCard periodData={periodData} />
      <PeakTimesCard periodData={periodData} />
      <ConsumptionInsightCard insight={periodData.insight} />
    </ScrollView>
  );
}

function ConsumptionHeader({ deviceLabel }: { deviceLabel?: string }) {
  return (
    <View className={usageClasses.header}>
      <Text className={usageClasses.title}>Consumo</Text>
      <Text className={usageClasses.subtitle}>Acompanhe seu historico de energia</Text>
      {deviceLabel ? <Text className={usageClasses.deviceLabel}>{deviceLabel}</Text> : null}
    </View>
  );
}

function PeriodFilterTabs({
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

function ConsumptionSummaryCards({ periodData }: { periodData: ConsumptionPeriod }) {
  return (
    <View className={usageClasses.summaryGrid}>
      <SummaryCard
        helper="No periodo selecionado"
        icon={<Zap color={usagePalette.primary} size={18} />}
        label="Consumo total"
        value={`${formatDecimal(periodData.totalKwh)} kWh`}
      />
      <SummaryCard
        helper="Com base na tarifa media"
        icon={<DollarSign color={usagePalette.success} size={18} />}
        label="Custo estimado"
        value={currencyFormatter.format(periodData.estimatedCost)}
      />
      <SummaryCard
        helper="Comportamento medio"
        icon={<Activity color={usagePalette.secondary} size={18} />}
        label="Media do periodo"
        value={periodData.average}
      />
      <SummaryCard
        helper="Maior concentracao"
        icon={<Clock3 color={usagePalette.warning} size={18} />}
        label="Maior pico"
        value={periodData.peak}
      />
    </View>
  );
}

function ConsumptionChart({ maxValue, periodData }: { maxValue: number; periodData: ConsumptionPeriod }) {
  return (
    <Card className={usageClasses.chartCard}>
      <SectionHeader actionLabel="kWh" title="Historico do periodo" />
      <View className={usageClasses.chart}>
        {periodData.chart.map((item, index) => {
          const isPeak = item.value === maxValue;

          return (
            <View key={`${item.label}-${index}`} className={usageClasses.barGroup}>
              <View className={usageClasses.barTrack}>
                <View
                  className="w-full rounded-2xl"
                  style={{
                    backgroundColor: isPeak ? usagePalette.secondary : usagePalette.primary,
                    height: `${Math.max((item.value / maxValue) * 100, 10)}%`,
                    minHeight: 12
                  }}
                />
              </View>
              <Text className={usageClasses.barValue}>{formatDecimal(item.value)}</Text>
              <Text className={usageClasses.barLabel}>{item.label}</Text>
            </View>
          );
        })}
      </View>
    </Card>
  );
}

function ComparisonCard({ periodData }: { periodData: ConsumptionPeriod }) {
  const isIncrease = periodData.comparison.direction === 'up';
  const Icon = isIncrease ? TrendingUp : TrendingDown;
  const toneClassName = isIncrease ? usageClasses.comparisonUp : usageClasses.comparisonDown;
  const textClassName = isIncrease ? usageClasses.comparisonUpText : usageClasses.comparisonDownText;

  return (
    <Card className={usageClasses.comparisonCard}>
      <View className={`${usageClasses.comparisonIcon} ${toneClassName}`}>
        <Icon color={isIncrease ? colors.danger : usagePalette.success} size={22} />
      </View>
      <View className={usageClasses.comparisonContent}>
        <Text className={usageClasses.cardEyebrow}>Comparacao</Text>
        <Text className={usageClasses.comparisonText}>{periodData.comparison.text}</Text>
        <Text className={`${usageClasses.comparisonBadge} ${textClassName}`}>
          {isIncrease ? 'Aumento' : 'Reducao'} de {periodData.comparison.value}%
        </Text>
      </View>
    </Card>
  );
}

function PeakTimesCard({ periodData }: { periodData: ConsumptionPeriod }) {
  return (
    <Card className={usageClasses.peaksCard}>
      <SectionHeader title="Horarios de pico" />
      <View className={usageClasses.peaksList}>
        {periodData.peaks.map((peak, index) => (
          <View key={peak.label} className={usageClasses.peakRow}>
            <View className={usageClasses.peakRank}>
              <Text className={usageClasses.peakRankText}>{index + 1}</Text>
            </View>
            <Text className={usageClasses.peakLabel}>{peak.label}</Text>
            <Text className={usageClasses.peakValue}>{peak.value}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

function ConsumptionInsightCard({ insight }: { insight: string }) {
  return (
    <Card className={usageClasses.insightCard}>
      <View className={usageClasses.insightIcon}>
        <BarChart3 color={colors.surface} size={22} />
      </View>
      <View className={usageClasses.insightContent}>
        <Text className={usageClasses.insightLabel}>Insight simples</Text>
        <Text className={usageClasses.insightText}>{insight}</Text>
      </View>
    </Card>
  );
}

function EmptyConsumptionState() {
  return (
    <Card className={usageClasses.emptyCard}>
      <View className={usageClasses.emptyIcon}>
        <AlertCircle color={usagePalette.primary} size={32} />
      </View>
      <Text className={usageClasses.emptyTitle}>Ainda nao ha dados suficientes</Text>
      <Text className={usageClasses.emptyText}>
        Assim que a tomada comecar a enviar informacoes, seu historico aparecera aqui.
      </Text>
    </Card>
  );
}

function OfflineDeviceNotice() {
  return (
    <Card className={usageClasses.offlineNotice}>
      <AlertCircle color={colors.warning} size={20} />
      <View className={usageClasses.offlineNoticeText}>
        <Text className={usageClasses.offlineNoticeTitle}>A tomada esta offline no momento</Text>
        <Text className={usageClasses.offlineNoticeBody}>Os dados exibidos sao do ultimo periodo sincronizado.</Text>
      </View>
    </Card>
  );
}

function formatDecimal(value: number) {
  return value.toFixed(1).replace('.', ',');
}
