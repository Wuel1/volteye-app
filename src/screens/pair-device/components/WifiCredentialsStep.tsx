import { Eye, EyeOff, Wifi } from 'lucide-react-native';
import { Pressable, Text, TextInput, View } from 'react-native';

import { Card } from '../../../components/Card';
import { PairingErrors, PairingFormState } from '../types';
import { pairDeviceClasses, pairDevicePalette } from '../styles';

export function WifiCredentialsStep({
  errors,
  form,
  onContinue,
  onTogglePassword,
  onUpdateField
}: {
  errors: PairingErrors;
  form: PairingFormState;
  onContinue: () => void;
  onTogglePassword: () => void;
  onUpdateField: (field: 'wifiName' | 'wifiPassword', value: string) => void;
}) {
  return (
    <Card className={pairDeviceClasses.card}>
      <View className={pairDeviceClasses.iconHero}>
        <Wifi color={pairDevicePalette.primary} size={32} />
      </View>
      <Text className="mt-5 text-[24px] font-black leading-8 text-[#283351]">Conecte ao Wi-Fi</Text>
      <Text className={pairDeviceClasses.subtitle}>Informe a rede que sua tomada vai usar para enviar dados ao VoltEye.</Text>

      <View className="mt-5 gap-4">
        <View className={pairDeviceClasses.fieldWrapper}>
          <Text className={pairDeviceClasses.fieldLabel}>Nome da rede Wi-Fi</Text>
          <TextInput
            autoCapitalize="none"
            className={pairDeviceClasses.fieldInput}
            onChangeText={(value) => onUpdateField('wifiName', value)}
            placeholder="Ex: MinhaCasa"
            placeholderTextColor="#8B94AE"
            value={form.wifiName}
          />
          {errors.wifiName ? <Text className={pairDeviceClasses.errorText}>{errors.wifiName}</Text> : null}
        </View>

        <View className={pairDeviceClasses.fieldWrapper}>
          <Text className={pairDeviceClasses.fieldLabel}>Senha do Wi-Fi</Text>
          <View className="flex-row gap-2">
            <TextInput
              autoCapitalize="none"
              className={pairDeviceClasses.fieldInput}
              onChangeText={(value) => onUpdateField('wifiPassword', value)}
              placeholder="Digite a senha"
              placeholderTextColor="#8B94AE"
              secureTextEntry={!form.isPasswordVisible}
              value={form.wifiPassword}
            />
            <Pressable accessibilityRole="button" className={pairDeviceClasses.inputAction} onPress={onTogglePassword}>
              {form.isPasswordVisible ? <EyeOff color="#6F7894" size={20} /> : <Eye color="#6F7894" size={20} />}
            </Pressable>
          </View>
          {errors.wifiPassword ? <Text className={pairDeviceClasses.errorText}>{errors.wifiPassword}</Text> : null}
        </View>
      </View>

      <Card className={pairDeviceClasses.notice}>
        <Wifi color={pairDevicePalette.primary} size={20} />
        <Text className={pairDeviceClasses.noticeText}>
          Use uma rede Wi-Fi estavel. Alguns dispositivos IoT funcionam melhor em redes 2.4 GHz.
        </Text>
      </Card>

      <Pressable accessibilityRole="button" className="mt-5 items-center rounded-2xl bg-[#4880FF] px-5 py-4" onPress={onContinue}>
        <Text className="text-[15px] font-black text-surface">Continuar</Text>
      </Pressable>
    </Card>
  );
}
