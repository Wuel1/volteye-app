import { useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenHeader } from '../../components/ScreenHeader';
import { PrivateRoutes } from '../../constants/routes';
import { RootStackParamList } from '../../navigation/types';
import { ConnectingStep } from './components/ConnectingStep';
import { PairingErrorState } from './components/PairingErrorState';
import { PairingProgressStepper } from './components/PairingProgressStepper';
import { PairingSuccessStep } from './components/PairingSuccessStep';
import { PrepareDeviceStep } from './components/PrepareDeviceStep';
import { WifiCredentialsStep } from './components/WifiCredentialsStep';
import { PairingDeviceInfo, PairingErrors, PairingFormState, PairingStep } from './types';
import { pairDeviceClasses } from './styles';

type PairDeviceScreenProps = NativeStackScreenProps<RootStackParamList, typeof PrivateRoutes.PAIR_DEVICE>;

const initialPairingState: PairingFormState = {
  isPasswordVisible: false,
  wifiName: '',
  wifiPassword: ''
};

export function PairDeviceScreen({ navigation, route }: PairDeviceScreenProps) {
  const device = useMemo<PairingDeviceInfo>(
    () => ({
      name: route.params.deviceName || 'Tomada principal',
      note: route.params.deviceNote,
      room: route.params.deviceRoom || 'Sala'
    }),
    [route.params.deviceName, route.params.deviceNote, route.params.deviceRoom]
  );

  const [currentStep, setCurrentStep] = useState<PairingStep>('prepare');
  const [form, setForm] = useState(initialPairingState);
  const [errors, setErrors] = useState<PairingErrors>({});
  const [activeConnectionStep, setActiveConnectionStep] = useState(0);

  useEffect(() => {
    if (currentStep !== 'connecting') {
      return;
    }

    setActiveConnectionStep(0);
    const timers = [900, 1800, 2700, 3600].map((delay, index) =>
      setTimeout(() => {
        setActiveConnectionStep(index);
      }, delay)
    );
    const successTimer = setTimeout(() => setCurrentStep('success'), 4500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(successTimer);
    };
  }, [currentStep]);

  function updateWifiField(field: keyof Pick<PairingFormState, 'wifiName' | 'wifiPassword'>, value: string) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
  }

  function handleContinueWifi() {
    const nextErrors: PairingErrors = {};

    if (!form.wifiName.trim()) {
      nextErrors.wifiName = 'Informe o nome da rede Wi-Fi.';
    }

    if (!form.wifiPassword.trim()) {
      nextErrors.wifiPassword = 'Informe a senha do Wi-Fi.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    setCurrentStep('connecting');
  }

  function handleRetry() {
    setCurrentStep('connecting');
  }

  function renderCurrentStep() {
    if (currentStep === 'prepare') {
      return <PrepareDeviceStep onReady={() => setCurrentStep('wifi')} />;
    }

    if (currentStep === 'wifi') {
      return (
        <WifiCredentialsStep
          errors={errors}
          form={form}
          onContinue={handleContinueWifi}
          onTogglePassword={() =>
            setForm((currentForm) => ({
              ...currentForm,
              isPasswordVisible: !currentForm.isPasswordVisible
            }))
          }
          onUpdateField={updateWifiField}
        />
      );
    }

    if (currentStep === 'connecting') {
      return (
        <ConnectingStep
          activeConnectionStep={activeConnectionStep}
          onSimulateError={() => setCurrentStep('error')}
        />
      );
    }

    if (currentStep === 'error') {
      return (
        <PairingErrorState
          onCancel={() => navigation.goBack()}
          onRetry={handleRetry}
          onWifiBack={() => setCurrentStep('wifi')}
        />
      );
    }

    return (
      <PairingSuccessStep
        device={device}
        onGoHome={() => navigation.navigate(PrivateRoutes.MAIN)}
        onViewDevice={() =>
          navigation.navigate(PrivateRoutes.DEVICE_DETAIL, {
            deviceId: '1',
            deviceName: device.name,
            deviceRoom: device.room
          })
        }
      />
    );
  }

  return (
    <View className="flex-1 bg-[#F9F8FF]">
      <ScreenHeader
        onBack={() => navigation.goBack()}
        subtitle="Siga os passos para parear seu dispositivo"
        title="Conectar tomada"
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView contentContainerClassName={pairDeviceClasses.content} showsVerticalScrollIndicator={false}>
          <PairingProgressStepper currentStep={currentStep} />
          {renderCurrentStep()}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
