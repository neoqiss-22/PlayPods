import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Layout } from '../../constants/spacing';

export interface TopNavigationProps {
  title?: string;
  showBackButton?: boolean;
  showLogo?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  showProfile?: boolean;
  profilePicture?: string;
  onBackPress?: () => void;
  onSearchPress?: () => void;
  onNotificationsPress?: () => void;
  onProfilePress?: () => void;
  onLogoPress?: () => void;
  variant?: 'default' | 'channel' | 'explore';
  style?: any;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  title,
  showBackButton = false,
  showLogo = false,
  showSearch = false,
  showNotifications = false,
  showProfile = false,
  profilePicture,
  onBackPress,
  onSearchPress,
  onNotificationsPress,
  onProfilePress,
  onLogoPress,
  variant = 'default',
  style,
}) => {
  const renderLeftSection = () => {
    if (showBackButton) {
      return (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onBackPress}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      );
    }
    
    if (showLogo) {
      return (
        <TouchableOpacity
          style={styles.logoContainer}
          onPress={onLogoPress}
          activeOpacity={0.8}
        >
          <Ionicons name="play" size={24} color={Colors.primary} />
          <Text style={styles.logoText}>PlayPods</Text>
        </TouchableOpacity>
      );
    }
    
    return <View style={styles.placeholder} />;
  };

  const renderCenterSection = () => {
    if (title) {
      return (
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      );
    }
    
    return <View style={styles.placeholder} />;
  };

  const renderRightSection = () => {
    const rightIcons = [];
    
    if (showSearch) {
      rightIcons.push(
        <TouchableOpacity
          key="search"
          style={styles.iconButton}
          onPress={onSearchPress}
          activeOpacity={0.7}
        >
          <Ionicons name="search" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      );
    }
    
    if (showNotifications) {
      rightIcons.push(
        <TouchableOpacity
          key="notifications"
          style={styles.iconButton}
          onPress={onNotificationsPress}
          activeOpacity={0.7}
        >
          <Ionicons name="notifications" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      );
    }
    
    if (showProfile) {
      rightIcons.push(
        <TouchableOpacity
          key="profile"
          style={styles.profileButton}
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Ionicons name="person" size={20} color={Colors.textSecondary} />
            </View>
          )}
        </TouchableOpacity>
      );
    }
    
    if (variant === 'channel') {
      rightIcons.push(
        <TouchableOpacity
          key="options"
          style={styles.iconButton}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <Ionicons name="ellipsis-vertical" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      );
    }
    
    if (variant === 'explore') {
      rightIcons.push(
        <TouchableOpacity
          key="options"
          style={styles.iconButton}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <Ionicons name="ellipsis-vertical" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      );
    }
    
    return rightIcons.length > 0 ? (
      <View style={styles.rightSection}>{rightIcons}</View>
    ) : (
      <View style={styles.placeholder} />
    );
  };

  return (
    <View style={[styles.container, style]}>
      {renderLeftSection()}
      {renderCenterSection()}
      {renderRightSection()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  logoText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginLeft: Spacing.sm,
  },
  
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: Spacing.base,
  },
  
  iconButton: {
    padding: Spacing.sm,
    borderRadius: Layout.borderRadius.sm,
  },
  
  profileButton: {
    padding: Spacing.xs,
  },
  
  profilePicture: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  
  profilePlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  placeholder: {
    width: 40,
  },
});