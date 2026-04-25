import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { colors, radius } from '../../theme/theme';

type PasswordInputProps = TextInputProps;

export function PasswordInput({ style, ...props }: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const Icon = isPasswordVisible ? EyeOff : Eye;

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={colors.textMuted}
        secureTextEntry={!isPasswordVisible}
        style={[styles.input, style]}
        {...props}
      />
      <Pressable
        accessibilityLabel={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
        accessibilityRole="button"
        hitSlop={8}
        onPress={() => setIsPasswordVisible((current) => !current)}
        style={styles.iconButton}
      >
        <Icon color={colors.textMuted} size={20} strokeWidth={2.2} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.outline,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 48
  },
  iconButton: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    width: 48
  },
  input: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    minHeight: 48,
    paddingLeft: 16,
    paddingRight: 4
  }
});
