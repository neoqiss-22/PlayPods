import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from '../../types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Layout } from '../../constants/spacing';

const { width } = Dimensions.get('window');

export interface MiniPlayerProps {
  video: Video | null;
  isVisible: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onClose: () => void;
  onPress: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  video,
  isVisible,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onClose,
  onPress,
}) => {
  if (!isVisible || !video) {
    return null;
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
      </View>
      
      {/* Player Content */}
      <TouchableOpacity
        style={styles.content}
        onPress={onPress}
        activeOpacity={0.9}
      >
        {/* Thumbnail */}
        <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
        
        {/* Video Info */}
        <View style={styles.videoInfo}>
          <Text style={styles.title} numberOfLines={1}>
            {video.title}
          </Text>
          <View style={styles.channelInfo}>
            <Text style={styles.channelName} numberOfLines={1}>
              {video.channel.username}
            </Text>
            {video.channel.isSubscribed && (
              <Ionicons name="checkmark-circle" size={12} color={Colors.primary} />
            )}
          </View>
        </View>
        
        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={onPlayPause}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={20}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80, // Above bottom navigation
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    zIndex: 1000,
  },
  
  progressBar: {
    height: 2,
    backgroundColor: Colors.border,
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
  },
  
  thumbnail: {
    width: 60,
    height: 34,
    borderRadius: Layout.borderRadius.sm,
    marginRight: Spacing.md,
  },
  
  videoInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.xs,
  },
  
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  channelName: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    marginRight: Spacing.xs,
  },
  
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  playButton: {
    padding: Spacing.sm,
    marginRight: Spacing.sm,
  },
  
  closeButton: {
    padding: Spacing.sm,
  },
});