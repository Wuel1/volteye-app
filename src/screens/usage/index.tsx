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
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Card } from '../../components/Card';
import { DeviceSelectorCard } from '../../components/DeviceSelectorCard';
import { SectionHeader } from '../../components/SectionHeader';
import { SummaryCard } from '../../components/SummaryCard';
import { consumptionMock, ConsumptionPeriod, ConsumptionPeriodKey } from '../../data/energy';
import { colors } from '../../theme/theme';
import { styles, usagePalette } from './styles';

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
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ConsumptionHeader />
        <EmptyConsumptionState />
      </ScrollView>
    );
  }

  const isOffline = device.status === 'offline';

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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
    <View style={styles.header}>
      <Text style={styles.title}>Consumo</Text>
      <Text style={styles.subtitle}>Acompanhe seu historico de energia</Text>
      {deviceLabel ? <Text style={styles.deviceLabel}>{deviceLabel}</Text> : null}
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
  return (
    <View style={styles.periodTabs}>
      {periodTabs.map((tab) => {
        const isActive = selectedPeriod === tab.key;

        return (
          <Pressable
            accessibilityRole="button"
            key={tab.key}
            onPress={() => onSelectPeriod(tab.key)}
            style={[styles.periodTab, isActive && styles.periodTabActive]}
          >
            <Text style={[styles.periodTabText, isActive && styles.periodTabTextActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function ConsumptionSummaryCards({ periodData }: { periodData: ConsumptionPeriod }) {
  return (
    <View style={styles.summaryGrid}>
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
    <Card style={styles.chartCard}>
      <SectionHeader actionLabel="kWh" title="Historico do periodo" />
      <View style={styles.chart}>
        {periodData.chart.map((item, index) => {
          const isPeak = item.value === maxValue;

          return (
            <View key={`${item.label}-${index}`} style={styles.barGroup}>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.bar,
                    {
                      backgroundColor: isPeak ? usagePalette.secondary : usagePalette.primary,
                      height: `${Math.max((item.value / maxValue) * 100, 10)}%`
                    }
                  ]}
                />
              </View>
              <Text style={styles.barValue}>{formatDecimal(item.value)}</Text>
              <Text style={styles.barLabel}>{item.label}</Text>
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
  const toneStyle = isIncrease ? styles.comparisonUp : styles.comparisonDown;
  const textStyle = isIncrease ? styles.comparisonUpText : styles.comparisonDownText;

  return (
    <Card style={styles.comparisonCard}>
      <View style={[styles.comparisonIcon, toneStyle]}>
        <Icon color={isIncrease ? colors.danger : usagePalette.success} size={22} />
      </View>
      <View style={styles.comparisonContent}>
        <Text style={styles.cardEyebrow}>Comparacao</Text>
        <Text style={styles.comparisonText}>{periodData.comparison.text}</Text>
        <Text style={[styles.comparisonBadge, textStyle]}>
          {isIncrease ? 'Aumento' : 'Reducao'} de {periodData.comparison.value}%
        </Text>
      </View>
    </Card>
  );
}

function PeakTimesCard({ periodData }: { periodData: ConsumptionPeriod }) {
  return (
    <Card style={styles.peaksCard}>
      <SectionHeader title="Horarios de pico" />
      <View style={styles.peaksList}>
        {periodData.peaks.map((peak, index) => (
          <View key={peak.label} style={styles.peakRow}>
            <View style={styles.peakRank}>
              <Text style={styles.peakRankText}>{index + 1}</Text>
            </View>
            <Text style={styles.peakLabel}>{peak.label}</Text>
            <Text style={styles.peakValue}>{peak.value}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

function ConsumptionInsightCard({ insight }: { insight: string }) {
  return (
    <Card style={styles.insightCard}>
      <View style={styles.insightIcon}>
        <BarChart3 color={colors.surface} size={22} />
      </View>
      <View style={styles.insightContent}>
        <Text style={styles.insightLabel}>Insight simples</Text>
        <Text style={styles.insightText}>{insight}</Text>
      </View>
    </Card>
  );
}

function EmptyConsumptionState() {
  return (
    <Card style={styles.emptyCard}>
      <View style={styles.emptyIcon}>
        <AlertCircle color={usagePalette.primary} size={32} />
      </View>
      <Text style={styles.emptyTitle}>Ainda nao ha dados suficientes</Text>
      <Text style={styles.emptyText}>
        Assim que a tomada comecar a enviar informacoes, seu historico aparecera aqui.
      </Text>
    </Card>
  );
}

function OfflineDeviceNotice() {
  return (
    <Card style={styles.offlineNotice}>
      <AlertCircle color={colors.warning} size={20} />
      <View style={styles.offlineNoticeText}>
        <Text style={styles.offlineNoticeTitle}>A tomada esta offline no momento</Text>
        <Text style={styles.offlineNoticeBody}>Os dados exibidos sao do ultimo periodo sincronizado.</Text>
      </View>
    </Card>
  );
}

function formatDecimal(value: number) {
  return value.toFixed(1).replace('.', ',');
}
