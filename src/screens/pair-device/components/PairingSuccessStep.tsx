import { CheckCircle2, PlugZap } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { PairingDeviceInfo } from '../types';
import { pairDeviceClasses, pairDevicePalette } from '../styles';

export function PairingSuccessStep({
  device,
  onGoHome,
  onViewDevice
}: {
  device: PairingDeviceInfo;
  onGoHome: () => void;
  onViewDevice: () => void;
}) {
  return (
    <Card className={pairDeviceClasses.card}>
      <View className={pairDeviceClasses.iconHero}>
        <CheckCircle2 color={pairDevicePalette.success} size={34} />
      </View>
      <Text className="mt-5 text-[24px] font-black leading-8 text-[#283351]">Tomada conectada com sucesso</Text>
      <Text className={pairDeviceClasses.subtitle}>Agora voce ja pode acompanhar o consumo em tempo real pelo VoltEye.</Text>

      <View className="mt-5 gap-3">
        <View className={pairDeviceClasses.summaryCard}>
          <Text className={pairDeviceClasses.summaryLabel}>Tomada</Text>
          <Text className={pairDeviceClasses.summaryTitle}>{device.name}</Text>
          <Text className="text-sm font-bold text-textMuted">{device.room}</Text>
          {device.note ? <Text className="mt-2 text-xs font-bold text-textMuted">{device.note}</Text> : null}
        </View>
        <View className="flex-row items-center gap-2">
          <PlugZap color={pairDevicePalette.primary} size={18} />
          <View className={pairDeviceClasses.successBadge}>
            <Text className={pairDeviceClasses.successBadgeText}>Online</Text>
          </View>
        </View>
      </View>

      <View className="mt-6 gap-3">
        <Pressable accessibilityRole="button" className={pairDeviceClasses.actionButton} onPress={onViewDevice}>
          <Text className={pairDeviceClasses.actionButtonText}>Ver tomada</Text>
        </Pressable>
        <Pressable accessibilityRole="button" className={pairDeviceClasses.actionButtonSecondary} onPress={onGoHome}>
          <Text className={pairDeviceClasses.actionButtonSecondaryText}>Ir para inicio</Text>
        </Pressable>
      </View>
    </Card>
  );
}
