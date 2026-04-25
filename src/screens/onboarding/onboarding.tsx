import { ChevronRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/button';
import { AuthRoutes } from '../../constants/routes';
import { RootStackParamList } from '../../navigation/types';

type OnboardingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

export function OnboardingScreen() {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const intro = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;
  const voltEyeLogo = require('../../../assets/volteye-logo.png');

  useEffect(() => {
    Animated.timing(intro, {
      duration: 850,
      easing: Easing.out(Easing.cubic),
      toValue: 1,
      useNativeDriver: true
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          toValue: 1,
          useNativeDriver: true
        }),
        Animated.timing(pulse, {
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          toValue: 0,
          useNativeDriver: true
        })
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          toValue: 1,
          useNativeDriver: true
        }),
        Animated.timing(float, {
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          toValue: 0,
          useNativeDriver: true
        })
      ])
    ).start();
  }, [float, intro, pulse]);

  const introStyle = {
    opacity: intro,
    transform: [
      {
        translateY: intro.interpolate({
          inputRange: [0, 1],
          outputRange: [22, 0]
        })
      }
    ]
  };

  const pulseStyle = {
    transform: [
      {
        scale: pulse.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.045]
        })
      }
    ]
  };

  const coreStyle = {
    transform: [
      {
        scale: pulse.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.96]
        })
      }
    ]
  };

  const floatUpStyle = {
    transform: [
      {
        translateY: float.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -8]
        })
      }
    ]
  };

  const floatDownStyle = {
    transform: [
      {
        translateY: float.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 8]
        })
      }
    ]
  };

  const boltStyle = {
    opacity: pulse.interpolate({
      inputRange: [0, 1],
      outputRange: [0.82, 1]
    }),
    transform: [
      {
        scale: pulse.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.12]
        })
      }
    ]
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 overflow-hidden bg-background px-6 pb-8 pt-4">
      {/* <Animated.Text className="text-2xl font-black text-primary" style={introStyle}>
        VoltEye
      </Animated.Text> */}

      <Animated.View className="relative h-[300px] w-full items-center justify-center" style={introStyle}>
        <Animated.View
          className="absolute left-0 top-2 z-10 rounded-control border border-[#eef0ff] bg-surface px-4 py-2 shadow-sm"
          style={floatUpStyle}
        >
          <Text className="text-xs font-semibold text-textMuted">Eficiencia: 98%</Text>
        </Animated.View>

        <Animated.View
          className="h-[280px] w-[280px] items-center justify-center rounded-full bg-[#c5c8ff] opacity-95"
          style={pulseStyle}
        >
          <View className="h-[184px] w-[184px] items-center justify-center rounded-full bg-background shadow-sm">
            <Animated.View
              className="h-[140px] w-[140px] items-center justify-center overflow-hidden rounded-full shadow-md"
              style={coreStyle}
            >
              <View style={styles.wave} />
              <View style={[styles.wave, styles.waveSecond]} />
              <Animated.Image
                className="h-40 w-40"
                resizeMode="contain"
                source={voltEyeLogo}
              />
            </Animated.View>
          </View>
        </Animated.View>

        <Animated.View
          className="absolute bottom-[30px] right-1 z-10 rounded-control border border-[#eef0ff] bg-surface px-4 py-2 shadow-sm"
          style={floatDownStyle}
        >
          <Text className="text-xs font-semibold text-textMuted">Economia Ativa</Text>
        </Animated.View>
      </Animated.View>

      <Animated.View className="w-full items-center gap-8" style={introStyle}>
        <Text className="text-center text-[29px] font-black leading-9 text-textMain">Bem-vindo ao{'\n'}VoltEye</Text>
        <Text className="max-w-[238px] text-center text-sm leading-[22px] text-textMuted">
          Monitore seu consumo de energia em tempo real e economize de verdade.
        </Text>

        <Button
          label="Começar Agora"
          onPress={() => navigation.navigate(AuthRoutes.LOGIN)}
          rightIcon={<ChevronRight color="white" size={20} strokeWidth={3} />}
        />

        <View className="flex-row gap-1">
          <View className="h-1 w-1.5 rounded-full bg-primary" />
          <View className="h-1 w-1 rounded-full bg-outlineSoft" />
          <View className="h-1 w-1 rounded-full bg-outlineSoft" />
        </View>

        <Pressable accessibilityRole="button" className="p-2" onPress={() => navigation.navigate(AuthRoutes.LOGIN)}>
          <Text className="text-sm text-textMuted">
            Já tem uma conta? <Text className="font-extrabold text-primary">Entrar</Text>
          </Text>
        </Pressable>

      </Animated.View>

      <Image source={voltEyeLogo} style={styles.logoWatermark} />
    </View>
  );
}

const styles = StyleSheet.create({
  wave: {
    borderColor: '#d8d5ff',
    borderRadius: 70,
    borderTopWidth: 2,
    height: 54,
    left: -12,
    opacity: 0.65,
    position: 'absolute',
    top: 52,
    width: 168
  },
  waveSecond: {
    left: 12,
    opacity: 0.4,
    top: 66
  },
  logoWatermark: {
    bottom: -80,
    height: 190,
    opacity: 0.03,
    position: 'absolute',
    right: -70,
    width: 190
  }
});
