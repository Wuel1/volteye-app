import { ReactNode } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ButtonVariant = 'primary';

type ButtonProps = TouchableOpacityProps & {
  label: string;
  rightIcon?: ReactNode;
  variant?: ButtonVariant;
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-[#7f91ff]'
};

export function Button({ className = '', label, rightIcon, variant = 'primary', ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      accessibilityRole="button"
      className={`min-h-11 w-full flex-row items-center justify-center gap-2 rounded-control shadow-md ${buttonVariants[variant]} ${className}`}
      {...props}
    >
      <Text className="text-[13px] font-bold text-surface">{label}</Text>
      {rightIcon}
    </TouchableOpacity>
  );
}
