import './global.css';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { AppRouter } from './src/navigation/app-router';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
        <StatusBar style="dark" />
        <View className="flex-1 bg-background">
          <AppRouter />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
