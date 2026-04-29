import { Pencil } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { profileMock } from '../../../data/energy';
import { colors } from '../../../theme/theme';
import { profileClasses } from '../styles';

export function ProfileHeader({ user }: { user: typeof profileMock.user }) {
  return (
    <View className={profileClasses.header}>
      <View className={profileClasses.avatarFrame}>
        <View className={profileClasses.avatar}>
          <Text className={profileClasses.avatarText}>{user.initials}</Text>
        </View>
        <View className={profileClasses.editBadge}>
          <Pencil color={colors.surface} size={12} />
        </View>
      </View>
      <Text className={profileClasses.headerName}>{user.name}</Text>
      <Text className={profileClasses.headerEmail}>{user.email}</Text>
    </View>
  );
}
