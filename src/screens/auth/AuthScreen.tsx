import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, radius, spacing } from '../../theme/theme';

type AuthScreenProps = {
  onContinue: () => void;
};

export function AuthScreen({ onContinue }: AuthScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../../assets/volteye-logo.png')} style={styles.logo} />
        <Text style={styles.title}>Acesse sua conta</Text>
        <Text style={styles.subtitle}>Entre ou crie seu cadastro para acompanhar sua energia.</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
        />
        <TextInput placeholder="Senha" placeholderTextColor={colors.textMuted} secureTextEntry style={styles.input} />
        <Pressable accessibilityRole="button" onPress={onContinue} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Entrar</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={onContinue} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Criar cadastro</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl
  },
  logo: {
    borderRadius: radius.lg,
    height: 76,
    marginBottom: spacing.md,
    width: 76
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center'
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.sm,
    maxWidth: 260,
    textAlign: 'center'
  },
  form: {
    gap: spacing.md
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.outline,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.text,
    fontSize: 15,
    minHeight: 48,
    paddingHorizontal: spacing.md
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    minHeight: 48,
    justifyContent: 'center'
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '800'
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: colors.secondary,
    borderRadius: radius.md,
    borderWidth: 1,
    minHeight: 48,
    justifyContent: 'center'
  },
  secondaryButtonText: {
    color: colors.secondary,
    fontSize: 15,
    fontWeight: '800'
  }
});
