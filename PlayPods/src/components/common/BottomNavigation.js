import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomNavigation = ({ activeTab }) => {
  const tabs = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'explore', icon: 'compass', label: 'Explore' },
    { id: 'upload', icon: 'add', label: '', isUpload: true },
    { id: 'channels', icon: 'people', label: 'Channels' },
    { id: 'library', icon: 'library', label: 'Library' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            tab.isUpload && styles.uploadTab,
            activeTab === tab.id && styles.activeTab
          ]}
        >
          <Ionicons
            name={tab.icon}
            size={tab.isUpload ? 32 : 24}
            color={activeTab === tab.id ? '#FF0000' : '#CCCCCC'}
          />
          {!tab.isUpload && (
            <View style={[
              styles.tabLabel,
              activeTab === tab.id && styles.activeTabLabel
            ]}>
              <View style={styles.labelContainer}>
                <View style={[
                  styles.labelDot,
                  activeTab === tab.id && styles.activeLabelDot
                ]} />
              </View>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingBottom: 20,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  uploadTab: {
    marginTop: -20,
  },
  activeTab: {
    // Active state styling
  },
  tabLabel: {
    marginTop: 4,
  },
  activeTabLabel: {
    // Active label styling
  },
  labelContainer: {
    alignItems: 'center',
  },
  labelDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  activeLabelDot: {
    backgroundColor: '#FF0000',
  },
});

export default BottomNavigation;