import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AppHeader = ({ 
  leftIcon,
  leftAction,
  centerTitle,
  rightIcon,
  rightAction,
  showLogo = false,
  showProfile = false,
  profileImage = null
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {leftIcon && (
          <TouchableOpacity style={styles.iconButton} onPress={leftAction}>
            <Ionicons name={leftIcon} size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        {showLogo && (
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="play" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.logoText}>PlayPods</Text>
          </View>
        )}
      </View>

      {centerTitle && (
        <Text style={styles.centerTitle}>{centerTitle}</Text>
      )}

      <View style={styles.rightSection}>
        {rightIcon && (
          <TouchableOpacity style={styles.iconButton} onPress={rightAction}>
            <Ionicons name={rightIcon} size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        {showProfile && profileImage && (
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileImage} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000000',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  iconButton: {
    padding: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  logoIcon: {
    backgroundColor: '#FF4458',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  centerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  profileButton: {
    padding: 4,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333333',
  },
});

export default AppHeader;