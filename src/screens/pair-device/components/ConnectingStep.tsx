import { CheckCircle2, Radio } from 'lucide-react-native';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { pairDeviceClasses, pairDevicePalette } from '../styles';

const connectionStepsMock = [
  'Procurando dispositivo',
  'Enviando dados do Wi-Fi',
  'Conectando a rede',
  'Finalizando configuracao'
];

export function ConnectingStep({
  activeConnectionStep,
  onSimulateError
}: {
  activeConnectionStep: number;
  onSimulateError: () => void;
}) {
  return (
    <Card className={pairDeviceClasses.card}>
      <View className={pairDeviceClasses.iconHero}>
        <Radio color={pairDevicePalette.primary} size={32} />
      </View>
      <Text className="mt-5 text-[24px] font-black leading-8 text-[#283351]">Conectando sua tomada</Text>
      <Text className={pairDeviceClasses.subtitle}>Estamos tentando conectar a tomada ao VoltEye.</Text>
      <View className="mt-6 items-center">
        <ActivityIndicator color={pairDevicePalette.primary} size={34} />
      </View>
      <View className="mt-6 gap-3">
        {connectionStepsMock.map((step, index) => {
          const isDone = index < activeConnectionStep;
          const isActive = index === activeConnectionStep;

          return (
            <View className={pairDeviceClasses.connectionStep} key={step}>
              <View className={pairDeviceClasses.connectionStepIcon}>
                {isDone ? (
                  <CheckCircle2 color={pairDevicePalette.success} size={18} />
                ) : (
                  <Radio color={isActive ? pairDevicePalette.primary : '#9AA3B8'} size={17} />
                )}
              </View>
              <Text className={pairDeviceClasses.connectionStepText}>{step}</Text>
            </View>
          );
        })}
      </View>
      <Pressable accessibilityRole="button" className="mt-5 items-center" onPress={onSimulateError}>
        <Text className="text-xs font-black text-textMuted">Simular erro de conexao</Text>
      </Pressable>
    </Card>
  );
}
