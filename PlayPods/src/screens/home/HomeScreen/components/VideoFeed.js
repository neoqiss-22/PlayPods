import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VideoCard from './VideoCard';

const VideoFeed = ({ selectedFilter }) => {
  const videos = [
    {
      id: 1,
      title: 'Adele - Easy On Me Live at the NRJ Awards 2021',
      channel: 'Amazon prime',
      views: '8.2 M',
      timeAgo: '5 months ago',
      isLive: true,
      thumbnail: 'adele-live',
    },
    {
      id: 2,
      title: 'Lord of Rings: The Rings of Power Official Trailer',
      channel: 'Amazon prime',
      views: '8.2 M',
      timeAgo: '5 months ago',
      isLive: false,
      thumbnail: 'rings-power',
    },
  ];

  const filteredVideos = selectedFilter === 'All' 
    ? videos 
    : videos.filter(video => 
        video.title.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        video.channel.toLowerCase().includes(selectedFilter.toLowerCase())
      );

  return (
    <View style={styles.container}>
      {filteredVideos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for bottom navigation
  },
});

export default VideoFeed;