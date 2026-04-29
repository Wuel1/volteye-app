import { WifiOff, Zap } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { HomeDevice } from '../../../data/energy';
import { colors } from '../../../theme/theme';
import { homeClasses, homePalette } from '../styles';

const currentConsumptionBars = [38, 52, 46, 66, 84, 58, 94];

export function CurrentConsumptionCard({ device, statusText }: { device: HomeDevice; statusText: string }) {
  const isOnline = device.status === 'online';
  const powerWatts = isOnline ? device.currentPowerWatts : device.lastKnownPowerWatts;

  return (
    <Card className={homeClasses.consumptionCard}>
      <View className={homeClasses.consumptionTop}>
        <View>
          <Text className={homeClasses.consumptionLabel}>Consumo agora</Text>
          <View className={homeClasses.powerRow}>
            <Text className={homeClasses.powerValue}>{powerWatts}</Text>
            <Text className={homeClasses.powerUnit}>W</Text>
          </View>
        </View>
        <View className={`${homeClasses.healthPill} ${isOnline ? homeClasses.healthOk : homeClasses.healthOffline}`}>
          {isOnline ? <Zap color={homePalette.primary} size={14} /> : <WifiOff color={colors.danger} size={14} />}
          <Text className={`${homeClasses.healthText} ${!isOnline ? homeClasses.healthOfflineText : ''}`}>
            {isOnline ? 'Estavel' : 'Ultimo dado'}
          </Text>
        </View>
      </View>

      <View className={homeClasses.miniBars}>
        {currentConsumptionBars.map((height, index) => (
          <View
            className={homeClasses.miniBar}
            key={`${height}-${index}`}
            style={{
              backgroundColor: index === currentConsumptionBars.length - 1 ? homePalette.secondarySoft : 'rgba(255, 255, 255, 0.34)',
              height,
              minHeight: 22
            }}
          />
        ))}
      </View>

      <View className={homeClasses.consumptionFooter}>
        <View className={homeClasses.normalIndicator} />
        <Text className={homeClasses.consumptionStatus}>{isOnline ? statusText : 'Mostrando o ultimo consumo registrado'}</Text>
      </View>
      <Text className={homeClasses.lastUpdate}>{isOnline ? device.lastUpdate : 'Sem atualizacao em tempo real'}</Text>
    </Card>
  );
}
