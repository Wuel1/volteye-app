import { Check } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../theme/theme';

type AppToastProps = {
  message: string;
  visible: boolean;
};

export function AppToast({ message, visible }: AppToastProps) {
  if (!visible) {
    return null;
  }

  return (
    <View pointerEvents="none" style={styles.wrapper}>
      <View style={styles.toast}>
        <View style={styles.icon}>
          <Check color={colors.surface} size={18} strokeWidth={3} />
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    backgroundColor: '#61D34F',
    borderRadius: 999,
    height: 26,
    justifyContent: 'center',
    width: 26
  },
  message: {
    color: colors.text,
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '600'
  },
  toast: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 54,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8
  },
  wrapper: {
    left: spacing.md,
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
    zIndex: 20
  }
});
