import { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { Card } from './Card';

type SummaryCardProps = {
  helper: string;
  icon: ReactNode;
  iconBackgroundColor?: string;
  label: string;
  value: string;
};

export function SummaryCard({
  helper,
  icon,
  iconBackgroundColor = '#EEF3FF',
  label,
  value
}: SummaryCardProps) {
  return (
    <Card className="flex-row items-center gap-4 rounded-3xl border-[#EEF1FF]">
      <View
        className="h-11 w-11 items-center justify-center rounded-2xl"
        style={{ backgroundColor: iconBackgroundColor }}
      >
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-xs font-black uppercase text-textMuted">{label}</Text>
        <Text className="mt-0.5 text-[22px] font-black text-textMain">{value}</Text>
        <Text className="mt-0.5 text-xs font-bold text-textMuted">{helper}</Text>
      </View>
    </Card>
  );
}
