import { PropsWithChildren } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

type CardProps = PropsWithChildren<{
  className?: string;
  style?: StyleProp<ViewStyle>;
}>;

export function Card({ children, className = '', style }: CardProps) {
  const hasCustomBackground = /\bbg-(?:\[[^\]]+\]|[^\s]+)/.test(className);
  const backgroundClass = hasCustomBackground ? '' : 'bg-surface';

  return (
    <View
      className={`rounded-card border border-[#E8ECFF] p-4 shadow-sm ${backgroundClass} ${className}`}
      style={style}
    >
      {children}
    </View>
  );
}
