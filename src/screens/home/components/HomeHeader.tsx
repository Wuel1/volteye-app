import { User } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { homeClasses, homePalette } from '../styles';

export function HomeHeader({ userName }: { userName: string }) {
  return (
    <View className={homeClasses.header}>
      <View className={homeClasses.headerText}>
        <Text className={homeClasses.greeting}>Ola, {userName}</Text>
        <Text className={homeClasses.headerTitle}>Veja o consumo da sua tomada agora</Text>
      </View>
      <Pressable accessibilityLabel="Abrir perfil" accessibilityRole="button" className={homeClasses.profileButton}>
        <User color={homePalette.primary} size={22} />
      </Pressable>
    </View>
  );
}
