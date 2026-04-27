import { Text, View } from 'react-native';

type SectionHeaderProps = {
  actionLabel?: string;
  title: string;
};

export function SectionHeader({ actionLabel, title }: SectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-lg font-black text-textMain">{title}</Text>
      {actionLabel ? <Text className="text-[13px] font-black text-primary">{actionLabel}</Text> : null}
    </View>
  );
}
