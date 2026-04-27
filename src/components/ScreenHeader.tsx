import { ArrowLeft } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

type ScreenHeaderProps = {
  onBack: () => void;
  subtitle?: string;
  title: string;
};

export function ScreenHeader({ onBack, subtitle, title }: ScreenHeaderProps) {
  return (
    <View className="border-b border-[#EEF1FF] bg-[#F9F8FF]/95 px-4 pb-4 pt-6">
      <View className="flex-row items-center gap-3">
        <Pressable accessibilityRole="button" className="h-10 w-10 items-center justify-center rounded-full bg-surface shadow-sm" onPress={onBack}>
          <ArrowLeft color="#283351" size={21} />
        </Pressable>
        <View className="flex-1">
          <Text className="text-[30px] font-black leading-9 text-[#283351]">{title}</Text>
          {subtitle ? <Text className="text-[15px] font-bold leading-[21px] text-textMuted">{subtitle}</Text> : null}
        </View>
      </View>
    </View>
  );
}
