import clsx from 'clsx';
import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type ButtonProps = {
  title: string;
  variant?: 'primary' | 'secondary' | 'link';
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, variant = 'primary', ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={clsx(
          styles.base,
          variant === 'primary' && styles.primary,
          variant === 'secondary' && styles.secondary,
          variant === 'link' && styles.link,
          touchableProps.className
        )}>
        <Text
          className={clsx(
            styles.textBase,
            variant === 'primary' && styles.textPrimary,
            variant === 'secondary' && styles.textSecondary,
            variant === 'link' && styles.textLink
          )}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

const styles = {
  base: 'rounded-[28px] p-4 items-center justify-center', // Common base styles
  textBase: 'text-lg font-semibold text-center', // Common text styles

  // Variant-specific styles
  primary: 'bg-indigo-500 shadow-md',
  textPrimary: 'text-white',

  secondary: 'bg-transparent border border-indigo-500',
  textSecondary: 'text-indigo-500',

  link: 'bg-transparent text-center',
  textLink: 'text-indigo-500 font-bold underline',
};
