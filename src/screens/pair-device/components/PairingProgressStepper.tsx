import { Check } from 'lucide-react-native';
import { DimensionValue, Text, View } from 'react-native';

import { PairingStep } from '../types';
import { pairDeviceClasses } from '../styles';

const steps: { key: Exclude<PairingStep, 'error'>; label: string }[] = [
  { key: 'prepare', label: 'Preparar' },
  { key: 'wifi', label: 'Wi-Fi' },
  { key: 'connecting', label: 'Conectando' },
  { key: 'success', label: 'Sucesso' }
];

export function PairingProgressStepper({ currentStep }: { currentStep: PairingStep }) {
  const currentIndex = Math.max(steps.findIndex((step) => step.key === currentStep), 0);
  const progressWidth = `${((currentIndex + 1) / steps.length) * 100}%` as DimensionValue;

  return (
    <View className="gap-4">
      <View className={pairDeviceClasses.progressBar}>
        <View className={pairDeviceClasses.progressFill} style={{ width: progressWidth }} />
      </View>
      <View className="flex-row justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentIndex && currentStep !== 'error';
          const isDone = index < currentIndex || currentStep === 'success';

          return (
            <View className="items-center" key={step.key}>
              <View
                className={`${pairDeviceClasses.stepCircle} ${
                  isDone ? pairDeviceClasses.stepCircleDone : isActive ? pairDeviceClasses.stepCircleActive : ''
                }`}
              >
                {isDone ? <Check color="#FFFFFF" size={15} /> : <Text className={isActive ? 'text-xs font-black text-surface' : 'text-xs font-black text-textMuted'}>{index + 1}</Text>}
              </View>
              <Text className={`${pairDeviceClasses.stepLabel} ${isActive ? pairDeviceClasses.stepLabelActive : ''}`}>
                {step.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
