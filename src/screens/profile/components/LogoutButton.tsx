import { LogOut } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { colors } from '../../../theme/theme';
import { profileClasses } from '../styles';

export function LogoutButton({ isLoading, onPress }: { isLoading: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" className={profileClasses.logoutButton} disabled={isLoading} onPress={onPress}>
      <View className="flex-row items-center gap-2">
        <LogOut color={colors.danger} size={18} />
        <Text className={profileClasses.logoutButtonText}>{isLoading ? 'Saindo...' : 'Sair'}</Text>
      </View>
    </Pressable>
  );
}
