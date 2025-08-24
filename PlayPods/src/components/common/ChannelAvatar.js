import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ChannelAvatar = ({ 
  avatar, 
  name, 
  isAddButton = false, 
  onPress,
  size = 60 
}) => {
  if (isAddButton) {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={[styles.avatar, { width: size, height: size, backgroundColor: '#333333' }]}>
          <Text style={styles.addIcon}>+</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image 
        source={{ uri: avatar }} 
        style={[styles.avatar, { width: size, height: size }]} 
      />
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  avatar: {
    borderRadius: 30,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  addIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default ChannelAvatar;