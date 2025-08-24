import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const RelatedVideos = () => {
  const relatedVideos = [
    {
      id: 1,
      title: "ASSASSIN'S CREED Full Movie Cinematic (2022) 4K ULTRA HD Action Fantasy",
      channel: 'Amazone prime',
      subscribers: '8 M subscribers',
      thumbnail: 'assassins-creed',
    },
    {
      id: 2,
      title: 'P.T. SILENT HILLS Full HD 1080p/60fps Longplay Walkthrough',
      channel: 'Amazone prime',
      subscribers: '8 M subscribers',
      thumbnail: 'silent-hills',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Maybe you like that</Text>
      
      {relatedVideos.map((video) => (
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
          </View>
          
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle} numberOfLines={2}>
              {video.title}
            </Text>
            <Text style={styles.channelName}>{video.channel}</Text>
            <Text style={styles.subscriberCount}>{video.subscribers}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100, // Space for bottom navigation
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  videoCard: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  thumbnailContainer: {
    marginRight: 12,
  },
  thumbnail: {
    width: 120,
    height: 68,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    opacity: 0.8,
  },
  videoInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
    lineHeight: 18,
  },
  channelName: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 2,
  },
  subscriberCount: {
    fontSize: 12,
    color: '#AAAAAA',
  },
});

export default RelatedVideos;