import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MiniPlayer = ({ 
  thumbnail, 
  title, 
  source, 
  isVerified = false,
  onPlay,
  onClose 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        
        <View style={styles.videoInfo}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <View style={styles.sourceContainer}>
            <Text style={styles.source}>{source}</Text>
            {isVerified && (
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            )}
          </View>
        </View>
        
        <View style={styles.controls}>
          <TouchableOpacity style={styles.playButton} onPress={onPlay}>
            <Ionicons name="play" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 48,
    height: 27,
    borderRadius: 6,
    backgroundColor: '#333333',
    marginRight: 12,
  },
  videoInfo: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  source: {
    color: '#CCCCCC',
    fontSize: 11,
    marginRight: 6,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#FF4458',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MiniPlayer;