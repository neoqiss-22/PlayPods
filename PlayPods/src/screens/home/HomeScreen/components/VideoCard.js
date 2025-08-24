import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const VideoCard = ({ video }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.thumbnailContainer}>
        <View style={styles.thumbnail}>
          <Ionicons 
            name="play-circle" 
            size={48} 
            color="#FFFFFF" 
            style={styles.playIcon}
          />
        </View>
        
        {video.isLive && (
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>Live</Text>
          </View>
        )}
        
        <TouchableOpacity style={styles.optionsButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.videoInfo}>
        <View style={styles.channelInfo}>
          <View style={styles.channelPicture}>
            <Ionicons name="person" size={16} color="#FFFFFF" />
          </View>
        </View>
        
        <View style={styles.textInfo}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {video.title}
          </Text>
          <Text style={styles.videoMeta}>
            {video.channel} • {video.views} views • {video.timeAgo}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  thumbnailContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  thumbnail: {
    width: width - 32,
    height: 200,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    opacity: 0.8,
  },
  liveBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF0000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  optionsButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
  },
  videoInfo: {
    flexDirection: 'row',
  },
  channelInfo: {
    marginRight: 12,
  },
  channelPicture: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfo: {
    flex: 1,
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

export default VideoCard;