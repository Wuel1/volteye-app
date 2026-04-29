import { FileText, Plus } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { SectionHeader } from '../../../components/SectionHeader';
import { homeClasses, homePalette } from '../styles';

export function QuickActions({ onAddDevice }: { onAddDevice?: () => void }) {
  const actions = [
    { Icon: FileText, label: 'Relatorio mensal' },
    { Icon: Plus, label: 'Adicionar tomada', onPress: onAddDevice }
  ];

  return (
    <View className={homeClasses.quickSection}>
      <SectionHeader title="Atalhos rapidos" />
      <View className={homeClasses.quickGrid}>
        {actions.map(({ Icon, label, onPress }) => (
          <Pressable accessibilityRole="button" className={homeClasses.quickAction} key={label} onPress={onPress}>
            <View className={homeClasses.quickIcon}>
              <Icon color={homePalette.primary} size={18} />
            </View>
            <Text className={homeClasses.quickLabel}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
