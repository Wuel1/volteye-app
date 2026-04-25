import { useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabBar, TabKey } from '../components/TabBar';
import { AuthRoutes, GeneralRoutes, PrivateRoutes } from '../constants/routes';
import { AuthScreen } from '../screens/auth/AuthScreen';
import { AlertsScreen } from '../screens/AlertsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { OnboardingScreen } from '../screens/onboarding/onboarding';
import { ProfileScreen } from '../screens/ProfileScreen';
import { UsageScreen } from '../screens/UsageScreen';
import { colors } from '../theme/theme';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={GeneralRoutes.ONBOARDING}
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
          headerShown: false
        }}
      >
        <Stack.Group>
          <Stack.Screen component={OnboardingScreen} name={GeneralRoutes.ONBOARDING} />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen component={AuthScreen} name={AuthRoutes.LOGIN} />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen component={MainScreen} name={PrivateRoutes.MAIN} />
        </Stack.Group>
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
