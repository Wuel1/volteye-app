import { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { Card } from '../../../components/Card';
import { profileClasses } from '../styles';

export function ProfileSection({ children, title }: { children: ReactNode; title: string }) {
  return (
    <View className={profileClasses.section}>
      <Text className={profileClasses.sectionLabel}>{title}</Text>
      <Card className={profileClasses.groupCard}>{children}</Card>
    </View>
  );
}
