import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FilterOptions = ({ selectedDate, selectedSort, onDateChange, onSortChange }) => {
  const dateOptions = ['News', 'Today', 'This week', 'This month'];
  const sortOptions = ['Most views', 'Most recent', 'Most liked', 'Most shared'];

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Date:</Text>
        <TouchableOpacity style={styles.filterDropdown}>
          <Text style={styles.filterValue}>{selectedDate}</Text>
          <Ionicons name="chevron-down" size={16} color="#AAAAAA" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Sort by:</Text>
        <TouchableOpacity style={styles.filterDropdown}>
          <Text style={styles.filterValue}>{selectedSort}</Text>
          <Ionicons name="chevron-down" size={16} color="#AAAAAA" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    fontSize: 14,
    color: '#AAAAAA',
    marginRight: 8,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterValue: {
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 4,
  },
});

export default FilterOptions;