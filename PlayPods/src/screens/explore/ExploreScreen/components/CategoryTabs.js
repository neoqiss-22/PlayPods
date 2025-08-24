import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CategoryTabs = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'Trend', icon: 'trending-up', label: 'Trend' },
    { id: 'Music', icon: 'musical-notes', label: 'Music' },
    { id: 'Gaming', icon: 'game-controller', label: 'Gaming' },
    { id: 'Learning', icon: 'bulb', label: 'Learning' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              selectedCategory === category.id && styles.categoryTabActive
            ]}
            onPress={() => onCategoryChange(category.id)}
          >
            <Ionicons
              name={category.icon}
              size={20}
              color={selectedCategory === category.id ? '#FF0000' : '#CCCCCC'}
              style={styles.categoryIcon}
            />
            <Text style={[
              styles.categoryLabel,
              selectedCategory === category.id && styles.categoryLabelActive
            ]}>
              {category.label}
            </Text>
            
            {selectedCategory === category.id && (
              <View style={styles.activeIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  categoryTab: {
    alignItems: 'center',
    marginRight: 24,
    paddingVertical: 8,
    position: 'relative',
  },
  categoryTabActive: {
    // Active state styling
  },
  categoryIcon: {
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 14,
    color: '#CCCCCC',
    fontWeight: '500',
  },
  categoryLabelActive: {
    color: '#FF0000',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: -8,
    width: 16,
    height: 3,
    backgroundColor: '#FF0000',
    borderRadius: 2,
  },
});

export default CategoryTabs;