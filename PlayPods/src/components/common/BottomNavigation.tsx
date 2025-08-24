import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Layout } from '../../constants/spacing';

const { width } = Dimensions.get('window');

export interface BottomNavigationProps {
  currentTab: 'home' | 'explore' | 'channels' | 'library';
  onTabPress: (tab: 'home' | 'explore' | 'channels' | 'library') => void;
  onUploadPress: () => void;
}

interface TabItem {
  key: 'home' | 'explore' | 'channels' | 'library';
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
}

const tabs: TabItem[] = [
  { key: 'home', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { key: 'explore', label: 'Explore', icon: 'compass-outline', activeIcon: 'compass' },
  { key: 'channels', label: 'Channels', icon: 'people-outline', activeIcon: 'people' },
  { key: 'library', label: 'Library', icon: 'library-outline', activeIcon: 'library' },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onTabPress,
  onUploadPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Upload Button Overlay */}
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={onUploadPress}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color={Colors.textPrimary} />
      </TouchableOpacity>
      
      {/* Navigation Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => {
          const isActive = currentTab === tab.key;
          const iconName = isActive ? tab.activeIcon : tab.icon;
          
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => onTabPress(tab.key)}
              activeOpacity={0.7}
            >
              <View style={styles.tabIconContainer}>
                <Ionicons
                  name={iconName}
                  size={24}
                  color={isActive ? Colors.primary : Colors.textSecondary}
                />
                {isActive && <View style={styles.activeIndicator} />}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isActive && styles.activeTabLabel,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: Spacing.sm,
    paddingTop: Spacing.md,
  },
  
  uploadButton: {
    position: 'absolute',
    top: -20,
    left: width / 2 - 30,
    width: 60,
    height: 60,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...Layout.shadow.lg,
    zIndex: 1000,
  },
  
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    marginTop: Spacing.lg,
  },
  
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  
  tabIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginBottom: Spacing.xs,
  },
  
  activeIndicator: {
    position: 'absolute',
    top: -2,
    width: 6,
    height: 6,
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  
  tabLabel: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center',
  },
  
  activeTabLabel: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
});