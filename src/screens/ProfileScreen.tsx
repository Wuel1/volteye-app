import { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { Button } from '../components/button';
import { Card } from '../components/Card';
import { recommendations } from '../data/energy';
import { supabase } from '../lib/supabase';
import { colors, spacing } from '../theme/theme';

export function ProfileScreen() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    setIsSigningOut(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Minha casa</Text>
      <Card>
        <Text style={styles.sectionTitle}>Residencia cadastrada</Text>
        <Text style={styles.body}>Casa principal com 8 comodos monitorados e meta mensal de 240 kWh.</Text>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Recomendacoes</Text>
        {recommendations.map((item) => (
          <Text key={item} style={styles.listItem}>
            - {item}
          </Text>
        ))}
      </Card>

      <Button isLoading={isSigningOut} label="Sair" loadingLabel="Saindo..." onPress={handleSignOut} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
    padding: spacing.md,
    paddingBottom: spacing.xl
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    paddingTop: spacing.sm
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: spacing.sm
  },
  body: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22
  },
  listItem: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 23,
    marginTop: spacing.sm
  }
});
