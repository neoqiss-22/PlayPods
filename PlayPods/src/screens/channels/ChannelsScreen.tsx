import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TopNavigation } from '../../components/common/TopNavigation';
import { BottomNavigation } from '../../components/common/BottomNavigation';
import { MiniPlayer } from '../../components/common/MiniPlayer';
import { Button } from '../../components/common/Button';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Layout } from '../../constants/spacing';
import { Channel, Video } from '../../types';

// Mock data - In a real app, this would come from an API
const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'Soroushnrz',
    profilePicture: 'https://via.placeholder.com/48x48',
    subscribers: 1000000,
    videos: 150,
    isSubscribed: false,
  },
  {
    id: '2',
    name: 'Jacob Jones',
    profilePicture: 'https://via.placeholder.com/48x48',
    subscribers: 3000000,
    videos: 200,
    isSubscribed: true,
  },
  {
    id: '3',
    name: 'Cameron Williamson',
    profilePicture: 'https://via.placeholder.com/48x48',
    subscribers: 223000,
    videos: 75,
    isSubscribed: true,
  },
  {
    id: '4',
    name: 'Devon Lane',
    profilePicture: 'https://via.placeholder.com/48x48',
    subscribers: 500000,
    videos: 120,
    isSubscribed: true,
  },
  {
    id: '5',
    name: 'Brooklyn Simmons',
    profilePicture: 'https://via.placeholder.com/48x48',
    subscribers: 1500000,
    videos: 180,
    isSubscribed: true,
  },
  {
    id: '6',
    name: 'Jerome Bell',
    profilePicture: 'https://via.placeholder.com/48x48',
    subscribers: 800000,
    videos: 95,
    isSubscribed: true,
  },
];

const sortOptions = ['May you like that', 'Most subscribers', 'Most recent', 'Alphabetical'];

export const ChannelsScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSort, setSelectedSort] = useState('May you like that');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isMiniPlayerVisible, setIsMiniPlayerVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleChannelPress = useCallback((channel: Channel) => {
    // Navigate to channel page
    console.log('Channel pressed:', channel.name);
  }, []);

  const handleSubscribePress = useCallback((channel: Channel) => {
    // Handle subscription toggle
    console.log('Subscribe pressed for:', channel.name);
  }, []);

  const handleTabPress = useCallback((tab: 'home' | 'explore' | 'channels' | 'library') => {
    // Handle tab navigation
    console.log('Tab pressed:', tab);
  }, []);

  const handleUploadPress = useCallback(() => {
    // Handle upload button press
    console.log('Upload pressed');
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleMiniPlayerClose = useCallback(() => {
    setIsMiniPlayerVisible(false);
    setCurrentVideo(null);
    setIsPlaying(false);
  }, []);

  const handleMiniPlayerPress = useCallback(() => {
    // Navigate to full video player
    console.log('Navigate to full player');
  }, []);

  const formatSubscribers = (subscribers: number): string => {
    if (subscribers >= 1000000) {
      return `${(subscribers / 1000000).toFixed(1)}M subscribers`;
    } else if (subscribers >= 1000) {
      return `${(subscribers / 1000).toFixed(1)}K subscribers`;
    }
    return `${subscribers} subscribers`;
  };

  const renderSearchSection = () => (
    <View style={styles.searchSection}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />
        <Text style={styles.searchPlaceholder}>Search channel</Text>
      </View>
    </View>
  );

  const renderSortSection = () => (
    <View style={styles.sortSection}>
      <Text style={styles.sortLabel}>Sort by:</Text>
      <TouchableOpacity 
        style={styles.sortDropdown}
        onPress={() => setShowSortDropdown(!showSortDropdown)}
      >
        <Text style={styles.sortValue}>{selectedSort}</Text>
        <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
      </TouchableOpacity>
      
      {showSortDropdown && (
        <View style={styles.sortOptions}>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.sortOption}
              onPress={() => {
                setSelectedSort(option);
                setShowSortDropdown(false);
              }}
            >
              <Text style={styles.sortOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const renderChannelItem = (channel: Channel) => (
    <TouchableOpacity
      key={channel.id}
      style={styles.channelItem}
      onPress={() => handleChannelPress(channel)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: channel.profilePicture }} style={styles.channelAvatar} />
      
      <View style={styles.channelInfo}>
        <Text style={styles.channelName} numberOfLines={1}>
          {channel.name}
        </Text>
        <View style={styles.channelStats}>
          <Text style={styles.subscriberCount}>
            {formatSubscribers(channel.subscribers)}
          </Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.videoCount}>
            {channel.videos} video{channel.videos !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>
      
      <Button
        title={channel.isSubscribed ? 'Subscribed' : 'Subscribe'}
        variant={channel.isSubscribed ? 'secondary' : 'primary'}
        size="small"
        onPress={() => handleSubscribePress(channel)}
        style={styles.subscribeButton}
      />
    </TouchableOpacity>
  );

  const renderChannelsList = () => (
    <View style={styles.channelsSection}>
      <Text style={styles.sectionTitle}>Recommended Channels</Text>
      <View style={styles.channelsList}>
        {mockChannels.map(renderChannelItem)}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        title="Channels"
        showBackButton
        showProfile
        profilePicture="https://via.placeholder.com/32x32"
        onBackPress={() => console.log('Back pressed')}
        onProfilePress={() => console.log('Profile pressed')}
      />
      
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderSearchSection()}
        {renderSortSection()}
        {renderChannelsList()}
      </ScrollView>

      <BottomNavigation
        currentTab="channels"
        onTabPress={handleTabPress}
        onUploadPress={handleUploadPress}
      />

      <MiniPlayer
        video={currentVideo}
        isVisible={isMiniPlayerVisible}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={handlePlayPause}
        onClose={handleMiniPlayerClose}
        onPress={handleMiniPlayerPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  content: {
    flex: 1,
  },
  
  searchSection: {
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.lg,
  },
  
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  
  searchPlaceholder: {
    color: Colors.textTertiary,
    fontSize: Typography.fontSize.base,
    marginLeft: Spacing.sm,
  },
  
  sortSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.lg,
  },
  
  sortLabel: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  
  sortDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Layout.borderRadius.md,
    minWidth: 150,
  },
  
  sortValue: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.sm,
    marginRight: Spacing.sm,
  },
  
  sortOptions: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: Spacing.sm,
    overflow: 'hidden',
    zIndex: 1000,
    minWidth: 200,
  },
  
  sortOption: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  
  sortOptionText: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.sm,
  },
  
  channelsSection: {
    paddingHorizontal: Spacing.base,
  },
  
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.lg,
  },
  
  channelsList: {
    gap: Spacing.md,
  },
  
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  
  channelAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: Spacing.md,
  },
  
  channelInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  
  channelName: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.xs,
  },
  
  channelStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  subscriberCount: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },
  
  dot: {
    color: Colors.textTertiary,
    fontSize: Typography.fontSize.sm,
    marginHorizontal: Spacing.xs,
  },
  
  videoCount: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },
  
  subscribeButton: {
    minWidth: 100,
  },
});