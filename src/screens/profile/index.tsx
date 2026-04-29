import { Bell, Building2, CircleHelp, CreditCard, PlugZap, User } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { PrivateRoutes } from '../../constants/routes';
import { profileMock } from '../../data/energy';
import { supabase } from '../../lib/supabase';
import { RootStackParamList } from '../../navigation/types';
import { LogoutButton } from './components/LogoutButton';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileRow, ProfileRowItem } from './components/ProfileRow';
import { ProfileSection } from './components/ProfileSection';
import { profileClasses } from './styles';

const accountItems = [
  {
    Icon: User,
    title: 'Dados do perfil'
  },
  {
    Icon: Building2,
    title: 'Meu imóvel/local'
  }
] satisfies ProfileRowItem[];

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
] satisfies ProfileRowItem[];

const systemItems = [
  {
    Icon: Bell,
    title: 'Notificações'
  },
  {
    Icon: CircleHelp,
    title: 'Ajuda'
  }
] satisfies ProfileRowItem[];

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
