export const Colors = {
  // Primary Colors
  primary: '#FF0000', // PlayPods Red
  primaryDark: '#CC0000',
  primaryLight: '#FF3333',
  
  // Background Colors
  background: '#121212',
  surface: '#1E1E1E',
  surfaceLight: '#2D2D2D',
  surfaceDark: '#0A0A0A',
  
  // Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: '#B3B3B3',
  textTertiary: '#808080',
  textDisabled: '#666666',
  
  // Interactive Elements
  buttonPrimary: '#FF0000',
  buttonSecondary: '#2D2D2D',
  buttonDisabled: '#404040',
  
  // Status Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Overlay Colors
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  
  // Border Colors
  border: '#333333',
  borderLight: '#404040',
  
  // Shadow Colors
  shadow: 'rgba(0, 0, 0, 0.5)',
  shadowLight: 'rgba(0, 0, 0, 0.2)',
} as const;

export type ColorKey = keyof typeof Colors;