import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ExploreHeader = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Explore</Text>
      
      <TouchableOpacity style={styles.optionsButton}>
        <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#121212',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  optionsButton: {
    padding: 8,
  },
});

export default ExploreHeader;