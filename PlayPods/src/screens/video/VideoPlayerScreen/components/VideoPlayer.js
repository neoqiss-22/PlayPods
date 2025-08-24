import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const VideoPlayer = () => {
  const [currentTime, setCurrentTime] = useState('2:20');
  const [totalTime, setTotalTime] = useState('4:20');
  const [progress, setProgress] = useState(0.55); // 2:20 / 4:20

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <View style={styles.videoPlaceholder}>
          <Ionicons 
            name="play-circle" 
            size={80} 
            color="#FFFFFF" 
            style={styles.playIcon}
          />
        </View>
        
        {/* Video Controls Overlay */}
        <View style={styles.controlsOverlay}>
          {/* Top Controls */}
          <View style={styles.topControls}>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="settings" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <View style={styles.timeInfo}>
              <Text style={styles.timeText}>{currentTime}</Text>
            </View>
            
            <View style={styles.rightControls}>
              <Text style={styles.timeText}>{totalTime}</Text>
              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="expand" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: width * 0.5625, // 16:9 aspect ratio
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  videoPlaceholder: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    opacity: 0.8,
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
    marginLeft: 16,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF0000',
    borderRadius: 2,
  },
});

export default VideoPlayer;