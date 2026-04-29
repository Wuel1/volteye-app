import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { DeviceSelectorCard } from '../../components/DeviceSelectorCard';
import { SectionHeader } from '../../components/SectionHeader';
import { AlertFilterKey, AlertItem, alertsMock } from '../../data/energy';
import { AlertCard } from './components/AlertCard';
import { AlertDetailModal } from './components/AlertDetailModal';
import { AlertsFilterTabs } from './components/AlertsFilterTabs';
import { AlertsHeader } from './components/AlertsHeader';
import { AlertsSummaryCard } from './components/AlertsSummaryCard';
import { EmptyAlertsState } from './components/EmptyAlertsState';
import { HighlightedAlertCard } from './components/HighlightedAlertCard';
import { NoDeviceAlertsState } from './components/NoDeviceAlertsState';
import { OfflineDeviceNotice } from './components/OfflineDeviceNotice';
import { SmartRecommendationCard } from './components/SmartRecommendationCard';
import { alertsClasses } from './styles';

export function AlertsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<AlertFilterKey>('all');
  const [selectedDeviceId, setSelectedDeviceId] = useState(alertsMock.selectedDevice?.id);
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);
  const device = alertsMock.devices.find((item) => item.id === selectedDeviceId) ?? alertsMock.selectedDevice;

  const filteredAlerts = useMemo(() => {
    return alertsMock.alerts.filter((alert) => {
      if (selectedFilter === 'all') {
        return true;
      }

      if (selectedFilter === 'important') {
        return alert.severity === 'high' || alert.status === 'new';
      }

      return alert.category === selectedFilter;
    });
  }, [selectedFilter]);

  if (!device) {
    return (
      <ScrollView contentContainerClassName={alertsClasses.content} showsVerticalScrollIndicator={false}>
        <AlertsHeader />
        <NoDeviceAlertsState />
      </ScrollView>
    );
  }

  const isOffline = device.status === 'offline';

  return (
    <>
      <ScrollView contentContainerClassName={alertsClasses.content} showsVerticalScrollIndicator={false}>
        <AlertsHeader statusText={`${alertsMock.summary.activeAlerts} alertas precisam da sua atencao`} />
        <DeviceSelectorCard
          devices={alertsMock.devices}
          onSelectDevice={(selectedDevice) => setSelectedDeviceId(selectedDevice.id)}
          selectedDevice={device}
        />
        {isOffline ? <OfflineDeviceNotice /> : null}
        <AlertsSummaryCard />
        <AlertsFilterTabs selectedFilter={selectedFilter} onSelectFilter={setSelectedFilter} />
        {alertsMock.highlightedAlert ? (
          <HighlightedAlertCard alert={alertsMock.highlightedAlert} onPress={() => setSelectedAlert(alertsMock.alerts[0])} />
        ) : null}
        <SmartRecommendationCard />
        {filteredAlerts.length ? (
          <View className={alertsClasses.list}>
            <SectionHeader title="Eventos recentes" />
            {filteredAlerts.map((alert) => (
              <AlertCard alert={alert} key={alert.id} onPress={() => setSelectedAlert(alert)} />
            ))}
          </View>
        ) : (
          <EmptyAlertsState />
        )}
      </ScrollView>
      <AlertDetailModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} />
    </>
  );
}
