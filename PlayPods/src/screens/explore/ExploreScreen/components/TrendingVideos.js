import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const TrendingVideos = ({ selectedCategory, selectedDate, selectedSort }) => {
  const trendingVideos = [
    {
      id: 1,
      title: 'Face Off: Chris Eubank Jr vs Conor Benn The countdown is well and truly on',
      views: '8 M',
      date: '26 sep',
      thumbnail: 'boxing-match',
    },
    {
      id: 2,
      title: 'Los iPhone 14 Pro Max y 14 Pro traen una característica increíble see',
      views: '8 M',
      date: '26 sep',
      thumbnail: 'iphone-14',
    },
    {
      id: 3,
      title: 'Warner Bros Games Avalanche: An Inside Look at the Hogwarts Legacy Game | Vision',
      views: '8 M',
      date: '26 sep',
      thumbnail: 'hogwarts-legacy',
    },
    {
      id: 4,
      title: 'Lil Baby - Detox (Official Video) new arrived on this channel amazing',
      views: '8 M',
      date: '26 sep',
      thumbnail: 'lil-baby',
    },
  ];

  return (
    <View style={styles.container}>
      {trendingVideos.map((video) => (
        <TouchableOpacity key={video.id} style={styles.videoCard}>
          <View style={styles.thumbnailContainer}>
            <View style={styles.thumbnail}>
              <Ionicons 
                name="play-circle" 
                size={48} 
                color="#FFFFFF" 
                style={styles.playIcon}
              />
            </View>
            
            <TouchableOpacity style={styles.optionsButton}>
              <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle} numberOfLines={2}>
              {video.title}
            </Text>
            <Text style={styles.videoMeta}>
              {video.views} Views • {video.date}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for bottom navigation
  },
  videoCard: {
    marginBottom: 20,
  },
  thumbnailContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  thumbnail: {
    width: width - 32,
    height: 180,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    opacity: 0.8,
  },
  optionsButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
  },
  videoInfo: {
    paddingHorizontal: 4,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
    lineHeight: 22,
  },
  videoMeta: {
    fontSize: 14,
    color: '#AAAAAA',
    lineHeight: 18,
  },
});

export default TrendingVideos;