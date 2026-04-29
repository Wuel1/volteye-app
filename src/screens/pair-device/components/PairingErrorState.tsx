import { AlertCircle } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { pairDeviceClasses, pairDevicePalette } from '../styles';

export function PairingErrorState({
  onCancel,
  onRetry,
  onWifiBack
}: {
  onCancel: () => void;
  onRetry: () => void;
  onWifiBack: () => void;
}) {
  return (
    <Card className={pairDeviceClasses.card}>
      <View className={pairDeviceClasses.iconHero}>
        <AlertCircle color={pairDevicePalette.warning} size={34} />
      </View>
      <Text className="mt-5 text-[24px] font-black leading-8 text-[#283351]">Nao conseguimos conectar</Text>
      <Text className={pairDeviceClasses.subtitle}>
        Verifique se a tomada esta em modo de pareamento e se a senha do Wi-Fi esta correta.
      </Text>
      <View className="mt-6 gap-3">
        <Pressable accessibilityRole="button" className={pairDeviceClasses.actionButton} onPress={onRetry}>
          <Text className={pairDeviceClasses.actionButtonText}>Tentar novamente</Text>
        </Pressable>
        <View className="flex-row gap-3">
          <Pressable accessibilityRole="button" className={pairDeviceClasses.errorButtonSecondary} onPress={onWifiBack}>
            <Text className={pairDeviceClasses.errorButtonSecondaryText}>Voltar para Wi-Fi</Text>
          </Pressable>
          <Pressable accessibilityRole="button" className={pairDeviceClasses.errorButton} onPress={onCancel}>
            <Text className={pairDeviceClasses.errorButtonText}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Card>
  );
}
