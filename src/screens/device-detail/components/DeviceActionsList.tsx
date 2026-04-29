import { Bell, ChevronRight, Edit3, History, RefreshCw, Trash2 } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { SectionHeader } from '../../../components/SectionHeader';
import { colors } from '../../../theme/theme';
import { deviceDetailClasses, deviceDetailPalette } from '../styles';

const actionItems = [
  { Icon: Edit3, label: 'Renomear tomada' },
  { Icon: Bell, label: 'Configurar alertas' },
  { Icon: History, label: 'Ver historico completo' },
  { Icon: RefreshCw, label: 'Verificar conexao' },
  { Icon: Trash2, isDanger: true, label: 'Remover tomada' }
];

export function DeviceActionsList({ isOffline }: { isOffline: boolean }) {
  return (
    <View className="gap-3">
      <SectionHeader title="Acoes da tomada" />
      <Card className={deviceDetailClasses.actionsCard}>
        {actionItems.map(({ Icon, isDanger, label }, index) => {
          const shouldEmphasizeConnection = isOffline && label === 'Verificar conexao';

          return (
            <View
              className={`${deviceDetailClasses.actionRow} ${index === actionItems.length - 1 ? deviceDetailClasses.actionRowLast : ''}`}
              key={label}
            >
              <View className={deviceDetailClasses.actionIcon}>
                <Icon color={isDanger ? colors.danger : shouldEmphasizeConnection ? deviceDetailPalette.primary : colors.textMuted} size={19} />
              </View>
              <Text className={isDanger ? deviceDetailClasses.actionDangerText : deviceDetailClasses.actionText}>{label}</Text>
              <ChevronRight color={colors.textMuted} size={18} />
            </View>
          );
        })}
      </Card>
    </View>
  );
}
