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
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Layout } from '../../constants/spacing';
import { Video, Playlist } from '../../types';

// Mock data - In a real app, this would come from an API
const mockPlaylists: Playlist[] = [
  {
    id: '1',
    title: 'My Favorites',
    thumbnail: 'https://via.placeholder.com/80x80',
    videoCount: 25,
    channel: {
      id: '1',
      username: 'Your Channel',
      profilePicture: 'https://via.placeholder.com/24x24',
      subscribers: 0,
      videos: 0,
      isSubscribed: false,
    },
  },
  {
    id: '2',
    title: 'Watch Later',
    thumbnail: 'https://via.placeholder.com/80x80',
    videoCount: 12,
    channel: {
      id: '1',
      username: 'Your Channel',
      profilePicture: 'https://via.placeholder.com/24x24',
      subscribers: 0,
      videos: 0,
      isSubscribed: false,
    },
  },
  {
    id: '3',
    title: 'Music Collection',
    thumbnail: 'https://via.placeholder.com/80x80',
    videoCount: 45,
    channel: {
      id: '1',
      username: 'Your Channel',
      profilePicture: 'https://via.placeholder.com/24x24',
      subscribers: 0,
      videos: 0,
      isSubscribed: false,
    },
  },
];

const mockWatchHistory: Video[] = [
  {
    id: '1',
    title: 'How to design a Phone app UI In Figma Step By Step | Figma Tutorial | 2022 UI',
    thumbnail: 'https://via.placeholder.com/120x68',
    channel: {
      id: '1',
      username: 'Design Master',
      profilePicture: 'https://via.placeholder.com/24x24',
      subscribers: 500000,
      videos: 200,
      isSubscribed: true,
    },
    views: 8000000,
    uploadDate: '2023-09-26',
  },
  {
    id: '2',
    title: 'React Native Tutorial for Beginners - Complete Course 2023',
    thumbnail: 'https://via.placeholder.com/120x68',
    channel: {
      id: '2',
      username: 'Code Academy',
      profilePicture: 'https://via.placeholder.com/24x24',
      subscribers: 1000000,
      videos: 150,
      isSubscribed: false,
    },
    views: 3000000,
    uploadDate: '2023-09-25',
  },
];

const librarySections = [
  { key: 'history', label: 'History', icon: 'time-outline' },
  { key: 'downloads', label: 'Downloads', icon: 'download-outline' },
  { key: 'playlists', label: 'Playlists', icon: 'list-outline' },
  { key: 'liked', label: 'Liked videos', icon: 'heart-outline' },
  { key: 'subscriptions', label: 'Subscriptions', icon: 'people-outline' },
];

export const LibraryScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSection, setSelectedSection] = useState('history');
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

  const handleVideoPress = useCallback((video: Video) => {
    setCurrentVideo(video);
    setIsMiniPlayerVisible(true);
    setIsPlaying(true);
    setCurrentTime(0);
    setDuration(120); // Mock duration
  }, []);

  const handlePlaylistPress = useCallback((playlist: Playlist) => {
    // Navigate to playlist
    console.log('Playlist pressed:', playlist.title);
  }, []);

  const handleSectionPress = useCallback((section: string) => {
    setSelectedSection(section);
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

  const renderLibrarySections = () => (
    <View style={styles.sectionsContainer}>
      {librarySections.map((section) => (
        <TouchableOpacity
          key={section.key}
          style={[
            styles.sectionItem,
            selectedSection === section.key && styles.sectionItemActive,
          ]}
          onPress={() => handleSectionPress(section.key)}
        >
          <Ionicons
            name={section.icon as any}
            size={24}
            color={selectedSection === section.key ? Colors.primary : Colors.textSecondary}
          />
          <Text
            style={[
              styles.sectionLabel,
              selectedSection === section.key && styles.sectionLabelActive,
            ]}
          >
            {section.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderPlaylistsSection = () => (
    <View style={styles.contentSection}>
      <Text style={styles.sectionTitle}>Your Playlists</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.playlistsContainer}>
        {mockPlaylists.map((playlist) => (
          <TouchableOpacity
            key={playlist.id}
            style={styles.playlistItem}
            onPress={() => handlePlaylistPress(playlist)}
            activeOpacity={0.7}
          >
            <Image source={{ uri: playlist.thumbnail }} style={styles.playlistThumbnail} />
            <Text style={styles.playlistTitle} numberOfLines={2}>
              {playlist.title}
            </Text>
            <Text style={styles.playlistCount}>
              {playlist.videoCount} video{playlist.videoCount !== 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderWatchHistory = () => (
    <View style={styles.contentSection}>
      <Text style={styles.sectionTitle}>Watch History</Text>
      <View style={styles.historyList}>
        {mockWatchHistory.map((video) => (
          <TouchableOpacity
            key={video.id}
            style={styles.historyItem}
            onPress={() => handleVideoPress(video)}
            activeOpacity={0.7}
          >
            <Image source={{ uri: video.thumbnail }} style={styles.historyThumbnail} />
            <View style={styles.historyInfo}>
              <Text style={styles.historyTitle} numberOfLines={2}>
                {video.title}
              </Text>
              <Text style={styles.historyChannel}>{video.channel.username}</Text>
              <Text style={styles.historyViews}>
                {video.views >= 1000000 
                  ? `${(video.views / 1000000).toFixed(1)}M views`
                  : `${(video.views / 1000).toFixed(1)}K views`
                }
              </Text>
            </View>
            <TouchableOpacity style={styles.historyOptions}>
              <Ionicons name="ellipsis-vertical" size={16} color={Colors.textSecondary} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderContent = () => {
    switch (selectedSection) {
      case 'playlists':
        return renderPlaylistsSection();
      case 'history':
      default:
        return renderWatchHistory();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        title="Library"
        showProfile
        profilePicture="https://via.placeholder.com/32x32"
        onProfilePress={() => console.log('Profile pressed')}
      />
      
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderLibrarySections()}
        {renderContent()}
      </ScrollView>

      <BottomNavigation
        currentTab="library"
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
  
  sectionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.xl,
  },
  
  sectionItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
    marginBottom: Spacing.sm,
    marginRight: Spacing.sm,
    borderRadius: Layout.borderRadius.md,
  },
  
  sectionItemActive: {
    backgroundColor: Colors.primary,
  },
  
  sectionLabel: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    marginLeft: Spacing.md,
  },
  
  sectionLabelActive: {
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  contentSection: {
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.xl,
  },
  
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.lg,
  },
  
  playlistsContainer: {
    marginLeft: -Spacing.base,
  },
  
  playlistItem: {
    width: 120,
    marginLeft: Spacing.base,
  },
  
  playlistThumbnail: {
    width: 120,
    height: 68,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Spacing.sm,
  },
  
  playlistTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.xs,
  },
  
  playlistCount: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
  },
  
  historyList: {
    gap: Spacing.md,
  },
  
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  
  historyThumbnail: {
    width: 120,
    height: 68,
    borderRadius: Layout.borderRadius.md,
    marginRight: Spacing.md,
  },
  
  historyInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  
  historyTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.xs,
    lineHeight: Typography.lineHeight.normal,
  },
  
  historyChannel: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    marginBottom: Spacing.xs,
  },
  
  historyViews: {
    color: Colors.textTertiary,
    fontSize: Typography.fontSize.xs,
  },
  
  historyOptions: {
    padding: Spacing.sm,
  },
});