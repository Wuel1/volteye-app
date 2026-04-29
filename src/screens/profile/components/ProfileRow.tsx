import { ChevronRight, User } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { colors } from '../../../theme/theme';
import { profileClasses, profilePalette } from '../styles';

export type ProfileRowItem = {
  Icon: typeof User;
  rightMeta?: string;
  rightMetaTone?: 'primary' | 'success';
  subtitle?: string;
  title: string;
};

export function ProfileRow({
  isLast,
  item,
  onPress
}: {
  isLast: boolean;
  item: ProfileRowItem;
  onPress?: () => void;
}) {
  const Icon = item.Icon;

  return (
    <Pressable accessibilityRole="button" className={`${profileClasses.row} ${isLast ? profileClasses.rowLast : ''}`} onPress={onPress}>
      <View className={profileClasses.rowIcon}>
        <Icon color={profilePalette.primary} size={19} />
      </View>
      <View className={profileClasses.rowText}>
        <Text className={profileClasses.rowTitle}>{item.title}</Text>
        {item.subtitle ? <Text className={profileClasses.rowSubtitle}>{item.subtitle}</Text> : null}
      </View>
      {item.rightMeta ? (
        <Text
          className={`${profileClasses.rowMeta} ${
            item.rightMetaTone === 'success' ? profileClasses.rowMetaSuccess : profileClasses.rowMetaPrimary
          }`}
        >
          {item.rightMeta}
        </Text>
      ) : null}
      <ChevronRight color={colors.textMuted} size={19} />
    </Pressable>
  );
}
