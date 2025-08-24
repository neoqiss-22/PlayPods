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
const cardWidth = (width - Spacing.base * 3) / 2;

export interface VideoCardProps {
  video: Video;
  onPress: (video: Video) => void;
  onOptionsPress?: (video: Video) => void;
  variant?: 'default' | 'compact' | 'large';
  showChannelInfo?: boolean;
  showDuration?: boolean;
  style?: any;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onPress,
  onOptionsPress,
  variant = 'default',
  showChannelInfo = true,
  showDuration = true,
  style,
}) => {
  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const renderThumbnail = () => (
    <View style={styles.thumbnailContainer}>
      <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
      
      {/* Live Badge */}
      {video.isLive && (
        <View style={styles.liveBadge}>
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      )}
      
      {/* Trailer Badge */}
      {video.isTrailer && (
        <View style={styles.trailerBadge}>
          <Text style={styles.trailerText}>TRAILER</Text>
        </View>
      )}
      
      {/* Duration */}
      {showDuration && video.duration && (
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
      )}
      
      {/* Play Button Overlay */}
      <View style={styles.playOverlay}>
        <Ionicons name="play" size={24} color={Colors.textPrimary} />
      </View>
    </View>
  );

  const renderChannelInfo = () => (
    <View style={styles.channelInfo}>
      <Image source={{ uri: video.channel.profilePicture }} style={styles.channelAvatar} />
      <View style={styles.channelText}>
        <Text style={styles.channelName} numberOfLines={1}>
          {video.channel.username}
        </Text>
        <Text style={styles.channelStats}>
          {formatViews(video.channel.subscribers)} subscribers
        </Text>
      </View>
    </View>
  );

  return (
    <TouchableOpacity
      style={[styles.container, styles[variant], style]}
      onPress={() => onPress(video)}
      activeOpacity={0.9}
    >
      {renderThumbnail()}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {video.title}
          </Text>
          {onOptionsPress && (
            <TouchableOpacity
              style={styles.optionsButton}
              onPress={() => onOptionsPress(video)}
            >
              <Ionicons name="ellipsis-vertical" size={16} color={Colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        
        {showChannelInfo && renderChannelInfo()}
        
        <View style={styles.metadata}>
          <Text style={styles.views}>{formatViews(video.views)} views</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.date}>{formatDate(video.uploadDate)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.md,
    overflow: 'hidden',
  },
  
  // Variants
  default: {
    width: cardWidth,
  },
  compact: {
    width: '100%',
    flexDirection: 'row',
    height: 80,
  },
  large: {
    width: '100%',
  },
  
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 16 / 9,
  },
  
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  
  liveBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Layout.borderRadius.sm,
  },
  
  liveText: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  
  trailerBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.info,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Layout.borderRadius.sm,
  },
  
  trailerText: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  
  durationBadge: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.overlay,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Layout.borderRadius.sm,
  },
  
  durationText: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.overlayLight,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
  },
  
  content: {
    padding: Spacing.md,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  
  title: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    lineHeight: Typography.lineHeight.normal,
  },
  
  optionsButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  
  channelAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: Spacing.sm,
  },
  
  channelText: {
    flex: 1,
  },
  
  channelName: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  
  channelStats: {
    color: Colors.textTertiary,
    fontSize: Typography.fontSize.xs,
  },
  
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  views: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },
  
  dot: {
    color: Colors.textTertiary,
    fontSize: Typography.fontSize.sm,
    marginHorizontal: Spacing.xs,
  },
  
  date: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },
});