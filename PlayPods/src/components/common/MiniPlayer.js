import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MiniPlayer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.miniPlayer}>
        {/* Thumbnail */}
        <View style={styles.thumbnail}>
          <Ionicons 
            name="play-circle" 
            size={32} 
            color="#FFFFFF" 
            style={styles.playIcon}
          />
        </View>
        
        {/* Video Info */}
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle} numberOfLines={1}>
            Lord of Rings :The Rings of Power Official Trailer
          </Text>
          <View style={styles.sourceInfo}>
            <Text style={styles.sourceText}>Amazone prime</Text>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
          </View>
        </View>
        
        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="play" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80, // Above bottom navigation
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  miniPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thumbnail: {
    width: 60,
    height: 40,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  playIcon: {
    opacity: 0.8,
  },
  videoInfo: {
    flex: 1,
    marginRight: 12,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceText: {
    fontSize: 12,
    color: '#AAAAAA',
    marginRight: 4,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
    marginLeft: 8,
  },
});

export default MiniPlayer;