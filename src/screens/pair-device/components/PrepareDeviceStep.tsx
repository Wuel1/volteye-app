import { Clock3, PlugZap, Power, Radio, Smartphone } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { pairDeviceClasses, pairDevicePalette } from '../styles';

const prepareSteps = [
  { Icon: PlugZap, text: 'Conecte a tomada na energia.' },
  { Icon: Radio, text: 'Aguarde a luz indicadora piscar.' },
  { Icon: Power, text: 'Pressione o botao da tomada ate entrar em modo de pareamento.' },
  { Icon: Smartphone, text: 'Mantenha o celular proximo ao dispositivo.' }
];

export function PrepareDeviceStep({ onReady }: { onReady: () => void }) {
  return (
    <Card className={pairDeviceClasses.card}>
      <View className={pairDeviceClasses.iconHero}>
        <PlugZap color={pairDevicePalette.primary} size={32} />
      </View>
      <Text className="mt-5 text-[24px] font-black leading-8 text-[#283351]">Prepare sua tomada</Text>
      <Text className={pairDeviceClasses.subtitle}>Esse processo pode levar alguns segundos.</Text>
      <View className={pairDeviceClasses.stepList}>
        {prepareSteps.map(({ Icon, text }, index) => (
          <View className={pairDeviceClasses.stepRow} key={text}>
            <View className={pairDeviceClasses.stepRowIcon}>
              <Icon color={index === 0 ? pairDevicePalette.primary : pairDevicePalette.secondary} size={18} />
            </View>
            <Text className={pairDeviceClasses.stepRowText}>{text}</Text>
          </View>
        ))}
      </View>
      <View className="mt-5 flex-row items-center gap-2">
        <Clock3 color={pairDevicePalette.warning} size={16} />
        <Text className="flex-1 text-xs font-bold text-textMuted">A luz piscando indica que a tomada esta pronta para ser encontrada.</Text>
      </View>
      <Pressable accessibilityRole="button" className="mt-6 items-center rounded-2xl bg-[#4880FF] px-5 py-4" onPress={onReady}>
        <Text className="text-[15px] font-black text-surface">Minha tomada esta pronta</Text>
      </Pressable>
    </Card>
  );
}
