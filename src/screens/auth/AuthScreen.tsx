import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { AuthRoutes, PrivateRoutes } from "../../constants/routes";
import { RootStackParamList } from "../../navigation/types";
import { colors, radius, spacing } from "../../theme/theme";
import { Button } from "@/components/button";
import { PasswordInput } from "@/components/password-input";
import { supabase } from "@/lib/supabase";

type AuthNavigationProp = NativeStackNavigationProp<RootStackParamList, "Auth">;

export function AuthScreen() {
  const navigation = useNavigation<AuthNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Informe email e senha para entrar.");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage("Email ou senha inválidos.");
      return;
    }

    navigation.replace(PrivateRoutes.MAIN);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/volteye-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Acesse sua conta</Text>
        <Text style={styles.subtitle}>
          Entre ou crie seu cadastro para acompanhar sua energia.
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={email}
        />
        <PasswordInput
          editable={!isLoading}
          onChangeText={setPassword}
          placeholder="Senha"
          value={password}
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
         
        <Button
          isLoading={isLoading}
          label="Entrar"
          loadingLabel="Entrando..."
          className="mt-10"
          onPress={handleSignIn}
        />

        <View className="flex-row items-center justify-center">
          <Text className="text-sm text-textMuted">Não tem uma conta?</Text>
          <Pressable
            accessibilityRole="button"
            className="px-1 py-2"
            disabled={isLoading}
            onPress={() => navigation.navigate(AuthRoutes.REGISTER)}
          >
            <Text className="text-sm font-semibold text-primary">Cadastre-se</Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  logo: {
    borderRadius: radius.lg,
    height: 76,
    marginBottom: spacing.md,
    width: 76,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.sm,
    maxWidth: 260,
    textAlign: "center",
  },
  form: {
    gap: spacing.md,
  },
  errorText: {
    color: "#e5484d",
    fontSize: 12,
    fontWeight: "600",
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.outline,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.text,
    fontSize: 15,
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
});
