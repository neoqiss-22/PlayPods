import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VideoCard = ({ 
  thumbnail, 
  title, 
  channelName, 
  views, 
  timeAgo, 
  isLive = false,
  onPress,
  onOptionsPress 
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        {isLive && (
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>Live</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.videoInfo}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <View style={styles.metadata}>
            <Text style={styles.channelName}>{channelName}</Text>
            <Text style={styles.views}>{views} views</Text>
            <Text style={styles.timeAgo}>{timeAgo}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.optionsButton} onPress={onOptionsPress}>
          <Ionicons name="ellipsis-vertical" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  thumbnailContainer: {
    position: 'relative',
    marginRight: 12,
  },
  thumbnail: {
    width: 120,
    height: 68,
    borderRadius: 8,
    backgroundColor: '#333333',
  },
  liveBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF4458',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoInfo: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    lineHeight: 18,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelName: {
    color: '#CCCCCC',
    fontSize: 12,
    marginRight: 8,
  },
  views: {
    color: '#CCCCCC',
    fontSize: 12,
    marginRight: 8,
  },
  timeAgo: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  optionsButton: {
    padding: 4,
  },
});

export default VideoCard;