import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryButton = ({ 
  title, 
  isSelected = false, 
  onPress,
  hasIcon = false,
  iconName = null 
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        isSelected && styles.selectedButton
      ]} 
      onPress={onPress}
    >
      <Text style={[
        styles.text, 
        isSelected && styles.selectedText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#333333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedButton: {
    backgroundColor: '#1A1A1A',
    borderColor: '#FF4458',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedText: {
    color: '#FF4458',
  },
});

export default CategoryButton;