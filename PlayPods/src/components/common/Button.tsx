import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Layout } from '../../constants/spacing';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.textPrimary : Colors.primary}
          size="small"
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={textStyleCombined}>{title}</Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  
  // Variants
  primary: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.surfaceLight,
    borderColor: Colors.surfaceLight,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: Colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  
  // Sizes
  small: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 32,
  },
  medium: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    minHeight: 56,
  },
  
  // States
  disabled: {
    backgroundColor: Colors.buttonDisabled,
    borderColor: Colors.buttonDisabled,
    opacity: 0.6,
  },
  fullWidth: {
    width: '100%',
  },
  
  // Text styles
  text: {
    fontFamily: Typography.fontFamily,
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center',
  },
  
  primaryText: {
    color: Colors.textPrimary,
  },
  secondaryText: {
    color: Colors.textPrimary,
  },
  outlineText: {
    color: Colors.primary,
  },
  ghostText: {
    color: Colors.primary,
  },
  
  smallText: {
    fontSize: Typography.fontSize.sm,
  },
  mediumText: {
    fontSize: Typography.fontSize.base,
  },
  largeText: {
    fontSize: Typography.fontSize.lg,
  },
  
  disabledText: {
    color: Colors.textDisabled,
  },
});