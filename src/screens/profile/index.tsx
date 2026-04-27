import {
  Bell,
  Building2,
  ChevronRight,
  CircleHelp,
  CreditCard,
  LogOut,
  Pencil,
  PlugZap,
  User
} from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { ReactNode, useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Card } from '../../components/Card';
import { PrivateRoutes } from '../../constants/routes';
import { profileMock } from '../../data/energy';
import { supabase } from '../../lib/supabase';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/theme';
import { profileClasses, profilePalette } from './styles';

const accountItems = [
  {
    Icon: User,
    title: 'Dados do perfil'
  },
  {
    Icon: Building2,
    title: 'Meu imóvel/local'
  }
];

const energyItems = [
  {
    Icon: PlugZap,
    rightMeta: `${profileMock.location.connectedDevicesCount} ativa`,
    rightMetaTone: 'success',
    title: 'Minhas tomadas'
  },
  {
    Icon: CreditCard,
    rightMeta: formatTariff(),
    rightMetaTone: 'primary',
    subtitle: '(R$/kWh)',
    title: 'Tarifa de energia'
  }
] as const;

const systemItems = [
  {
    Icon: Bell,
    title: 'Notificações'
  },
  {
    Icon: CircleHelp,
    title: 'Ajuda'
  }
];

export function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [profileUser, setProfileUser] = useState(profileMock.user);

  useEffect(() => {
    let isMounted = true;

    async function loadSessionUser() {
      const { data } = await supabase.auth.getUser();
      const sessionUser = data.user;

      if (!isMounted || !sessionUser) {
        return;
      }

      setProfileUser(getProfileUserFromSession(sessionUser));
    }

    loadSessionUser();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSignOut() {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    setIsSigningOut(false);
  }

  return (
    <ScrollView contentContainerClassName={profileClasses.content} showsVerticalScrollIndicator={false}>
      <ProfileHeader user={profileUser} />

      <ProfileSection title="Dados da conta">
        {accountItems.map((item, index) => (
          <ProfileRow isLast={index === accountItems.length - 1} item={item} key={item.title} />
        ))}
      </ProfileSection>

      <ProfileSection title="Gestão de energia">
        {energyItems.map((item, index) => (
          <ProfileRow
            isLast={index === energyItems.length - 1}
            item={item}
            key={item.title}
            onPress={item.title === 'Minhas tomadas' ? () => navigation.navigate(PrivateRoutes.DEVICES) : undefined}
          />
        ))}
      </ProfileSection>

      <ProfileSection title="Sistema">
        {systemItems.map((item, index) => (
          <ProfileRow isLast={index === systemItems.length - 1} item={item} key={item.title} />
        ))}
      </ProfileSection>

      <LogoutButton isLoading={isSigningOut} onPress={handleSignOut} />
    </ScrollView>
  );
}

function ProfileHeader({ user }: { user: typeof profileMock.user }) {
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

function ProfileSection({ children, title }: { children: ReactNode; title: string }) {
  return (
    <View className={profileClasses.section}>
      <Text className={profileClasses.sectionLabel}>{title}</Text>
      <Card className={profileClasses.groupCard}>{children}</Card>
    </View>
  );
}

function ProfileRow({
  isLast,
  item,
  onPress
}: {
  isLast: boolean;
  item: {
    Icon: typeof User;
    rightMeta?: string;
    rightMetaTone?: 'primary' | 'success';
    subtitle?: string;
    title: string;
  };
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

function LogoutButton({ isLoading, onPress }: { isLoading: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" className={profileClasses.logoutButton} disabled={isLoading} onPress={onPress}>
      <View className="flex-row items-center gap-2">
        <LogOut color={colors.danger} size={18} />
        <Text className={profileClasses.logoutButtonText}>{isLoading ? 'Saindo...' : 'Sair'}</Text>
      </View>
    </Pressable>
  );
}

function formatTariff() {
  if (!profileMock.energyTariff.configured || profileMock.energyTariff.value === null) {
    return 'Não definida';
  }

  return `R$ ${profileMock.energyTariff.value.toFixed(2).replace('.', ',')}`;
}

function getProfileUserFromSession(user: SupabaseUser) {
  const email = user.email ?? profileMock.user.email;
  const metadataName =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.user_metadata?.display_name;
  const name = typeof metadataName === 'string' && metadataName.trim().length > 0
    ? metadataName
    : getNameFromEmail(email);

  return {
    email,
    initials: getInitials(name),
    name
  };
}

function getNameFromEmail(email: string) {
  const [emailName] = email.split('@');

  return emailName
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getInitials(name: string) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

  return initials || profileMock.user.initials;
}
