import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const NewsSection = ({ activeTab }) => {
  if (activeTab !== 'Home') {
    return null; // Only show for Home tab
  }

  const newsVideos = [
    {
      id: 1,
      title: 'How to design a Phone app UI In Figma Step By Step | Figma Tutorial | 2022 UI',
      views: '8 M',
      date: '26 sep',
      thumbnail: 'figma-tutorial',
    },
    {
      id: 2,
      title: 'Advanced React Native Animation Techniques | Performance Tips',
      views: '5.2 M',
      date: '24 sep',
      thumbnail: 'react-native',
    },
    {
      id: 3,
      title: 'Building Scalable Mobile Apps with Clean Architecture',
      views: '3.8 M',
      date: '22 sep',
      thumbnail: 'architecture',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>News</Text>
      
      {newsVideos.map((video) => (
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
            <Text style={styles.videoMeta}>
              {video.views} Views • {video.date}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.optionsButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100, // Space for mini player and bottom navigation
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  videoCard: {
    flexDirection: 'row',
    marginBottom: 20,
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
  videoMeta: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  optionsButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
});

export default NewsSection;