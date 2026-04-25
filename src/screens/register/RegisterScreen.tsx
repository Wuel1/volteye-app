import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../../components/button';
import { PasswordInput } from '../../components/password-input';
import { AuthRoutes } from '../../constants/routes';
import { supabase } from '../../lib/supabase';
import { RootStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme/theme';

type RegisterNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export function RegisterScreen() {
  const navigation = useNavigation<RegisterNavigationProp>();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [phone, setPhone] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const hasEmail = email.trim().length > 0;
  const isEmailValid = isValidEmail(email);

  function handlePhoneChange(value: string) {
    setPhone(formatPhone(value));
  }

  async function handleSignUp() {
    setErrorMessage('');
    setSuccessMessage('');

    if (!name.trim() || !email.trim() || !phone.trim() || !password || !passwordConfirmation) {
      setErrorMessage('Preencha todos os campos para continuar.');
      return;
    }

    if (!isEmailValid) {
      setErrorMessage('Digite um email válido.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage('As senhas não conferem.');
      return;
    }

    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      options: {
        data: {
          name: name.trim(),
          phone: phone.replace(/\D/g, '')
        }
      },
      password
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (data.session) {
      return;
    }

    setSuccessMessage('Cadastro criado. Verifique seu email para confirmar a conta.');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../../assets/volteye-logo.png')} style={styles.logo} />
        <Text style={styles.title}>Crie sua conta</Text>
        <Text style={styles.subtitle}>Cadastre seus dados para começar a acompanhar seu consumo.</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          editable={!isLoading}
          onChangeText={setName}
          placeholder="Nome"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={name}
        />
        <View style={styles.field}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={colors.textMuted}
            style={[styles.input, hasEmail && (isEmailValid ? styles.inputValid : styles.inputInvalid)]}
            value={email}
          />
          {hasEmail ? (
            <Text style={[styles.feedback, isEmailValid ? styles.feedbackValid : styles.feedbackInvalid]}>
              {isEmailValid ? 'Email válido' : 'Digite um email válido'}
            </Text>
          ) : null}
        </View>
        <TextInput
          keyboardType="phone-pad"
          editable={!isLoading}
          maxLength={16}
          onChangeText={handlePhoneChange}
          placeholder="Telefone"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={phone}
        />
        <PasswordInput editable={!isLoading} onChangeText={setPassword} placeholder="Senha" value={password} />
        <PasswordInput
          editable={!isLoading}
          onChangeText={setPasswordConfirmation}
          placeholder="Confirmação de senha"
          value={passwordConfirmation}
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

        <Button
          className="mt-6"
          isLoading={isLoading}
          label="Cadastrar"
          loadingLabel="Criando conta..."
          onPress={handleSignUp}
        />

        <View className="flex-row items-center justify-center">
          <Text className="text-sm text-textMuted">Já tem uma conta?</Text>
          <Pressable
            accessibilityRole="button"
            className="px-1 py-2"
            disabled={isLoading}
            onPress={() => navigation.navigate(AuthRoutes.LOGIN)}
          >
            <Text className="text-sm font-semibold text-primary">Entrar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 2) {
    return digits.length ? `(${digits}` : '';
  }

  if (digits.length <= 3) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg
  },
  form: {
    gap: spacing.md
  },
  feedback: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
    paddingHorizontal: 4
  },
  feedbackInvalid: {
    color: '#e5484d'
  },
  feedbackValid: {
    color: '#2f9e44'
  },
  field: {
    width: '100%'
  },
  errorText: {
    color: '#e5484d',
    fontSize: 12,
    fontWeight: '600'
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl
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
  inputInvalid: {
    borderColor: '#e5484d'
  },
  inputValid: {
    borderColor: '#2f9e44'
  },
  successText: {
    color: '#2f9e44',
    fontSize: 12,
    fontWeight: '600'
  },
  logo: {
    borderRadius: radius.lg,
    height: 76,
    marginBottom: spacing.md,
    width: 76
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.sm,
    maxWidth: 280,
    textAlign: 'center'
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center'
  }
});
