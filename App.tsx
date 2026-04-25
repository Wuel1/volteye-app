import { useMemo, useState } from 'react';
import './global.css';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TabBar, TabKey } from './src/components/TabBar';
import { AuthScreen } from './src/screens/auth/AuthScreen';
import { AlertsScreen } from './src/screens/AlertsScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { OnboardingScreen } from './src/screens/onboarding/onboarding';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { UsageScreen } from './src/screens/UsageScreen';
import { colors } from './src/theme/theme';

type AppRoute = 'onboarding' | 'auth' | 'main';

export default function App() {
  const [route, setRoute] = useState<AppRoute>('onboarding');
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const Screen = useMemo(() => {
    const screens = {
      alerts: AlertsScreen,
      home: HomeScreen,
      profile: ProfileScreen,
      usage: UsageScreen
    };

    return screens[activeTab];
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.app}>
        {route === 'onboarding' ? (
          <OnboardingScreen onStart={() => setRoute('auth')} />
        ) : route === 'auth' ? (
          <AuthScreen onContinue={() => setRoute('main')} />
        ) : (
          <>
            <Screen />
            <TabBar activeTab={activeTab} onChange={setActiveTab} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1
  },
  app: {
    backgroundColor: colors.background,
    flex: 1
  }
});
