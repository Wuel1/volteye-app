import { PropsWithChildren } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

type CardProps = PropsWithChildren<{
  className?: string;
  style?: StyleProp<ViewStyle>;
}>;

export function Card({ children, className = '', style }: CardProps) {
  return (
    <View
      className={`rounded-card border border-[#E8ECFF] bg-surface p-4 shadow-sm ${className}`}
      style={style}
    >
      {children}
    </View>
  );
}
