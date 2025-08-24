import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SortOptions = ({ sortBy, onSortChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity style={styles.sortDropdown}>
          <Text style={styles.sortValue}>{sortBy}</Text>
          <Ionicons name="chevron-down" size={16} color="#AAAAAA" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    color: '#AAAAAA',
    marginRight: 8,
  },
  sortDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sortValue: {
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 4,
  },
});

export default SortOptions;