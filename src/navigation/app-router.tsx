import { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';

import { TabBar, TabKey } from '../components/TabBar';
import { AuthRoutes, GeneralRoutes, PrivateRoutes } from '../constants/routes';
import { AddDeviceScreen } from '../screens/add-device';
import { AuthScreen } from '../screens/auth/AuthScreen';
import { AlertsScreen } from '../screens/alerts';
import { DeviceDetailScreen } from '../screens/device-detail';
import { DevicesScreen } from '../screens/devices';
import { HomeScreen } from '../screens/home';
import { OnboardingScreen } from '../screens/onboarding/onboarding';
import { PairDeviceScreen } from '../screens/pair-device';
import { ProfileScreen } from '../screens/profile';
import { RegisterScreen } from '../screens/register/RegisterScreen';
import { UsageScreen } from '../screens/usage';
import { colors } from '../theme/theme';
import { supabase } from '../lib/supabase';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRouter() {
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoadingSession(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setIsLoadingSession(false);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  if (isLoadingSession) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
          headerShown: false
        }}
      >
        {session ? (
          <>
            <Stack.Screen component={MainScreen} name={PrivateRoutes.MAIN} />
            <Stack.Screen component={DevicesScreen} name={PrivateRoutes.DEVICES} />
            <Stack.Screen component={DeviceDetailScreen} name={PrivateRoutes.DEVICE_DETAIL} />
            <Stack.Screen component={AddDeviceScreen} name={PrivateRoutes.ADD_DEVICE} />
            <Stack.Screen component={PairDeviceScreen} name={PrivateRoutes.PAIR_DEVICE} />
          </>
        ) : (
          <>
            <Stack.Screen component={OnboardingScreen} name={GeneralRoutes.ONBOARDING} />
            <Stack.Screen component={AuthScreen} name={AuthRoutes.LOGIN} />
            <Stack.Screen component={RegisterScreen} name={AuthRoutes.REGISTER} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen() {
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
    <>
      <Screen />
      <TabBar activeTab={activeTab} onChange={setActiveTab} />
    </>
  );
}
