import { ReactNode } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ButtonVariant = 'primary';

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean;
  label: string;
  loadingLabel?: string;
  rightIcon?: ReactNode;
  variant?: ButtonVariant;
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-[#7f91ff]'
};

export function Button({
  className = '',
  disabled,
  isLoading = false,
  label,
  loadingLabel,
  rightIcon,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      accessibilityRole="button"
      className={`min-h-11 w-full flex-row items-center justify-center gap-2 rounded-control shadow-md ${buttonVariants[variant]} ${isDisabled ? 'opacity-70' : ''} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <>
          <ActivityIndicator color="white" />
          {loadingLabel ? <Text className="text-[13px] font-bold text-surface">{loadingLabel}</Text> : null}
        </>
      ) : (
        <>
          <Text className="text-[13px] font-bold text-surface">{label}</Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
}
