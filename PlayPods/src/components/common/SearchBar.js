import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ 
  placeholder = "Search...",
  value,
  onChangeText,
  onSearch,
  showFilter = false,
  onFilterPress,
  style 
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#CCCCCC" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#666666"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSearch}
          returnKeyType="search"
        />
      </View>
      
      {showFilter && (
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Ionicons name="options" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: showFilter ? 12 : 0,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },
  filterButton: {
    backgroundColor: '#333333',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;