import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/theme';

type SectionHeaderProps = {
  actionLabel?: string;
  title: string;
};

export function SectionHeader({ actionLabel, title }: SectionHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel ? <Text style={styles.action}>{actionLabel}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900'
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900'
  }
});
