import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopNavigation } from '../../components/common/TopNavigation';
import { VideoCard } from '../../components/common/VideoCard';
import { BottomNavigation } from '../../components/common/BottomNavigation';
import { MiniPlayer } from '../../components/common/MiniPlayer';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Layout } from '../../constants/spacing';
import { Video, User } from '../../types';

const { width } = Dimensions.get('window');

// Mock data - In a real app, this would come from an API
const mockUser: User = {
  id: '1',
  username: 'Your Profile',
  profilePicture: 'https://via.placeholder.com/32x32',
  subscribers: 0,
  videos: 0,
  isSubscribed: false,
};

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Adele - Easy On Me Live at the NRJ Awards 2021',
    thumbnail: 'https://via.placeholder.com/320x180',
    channel: {
      id: '1',
      username: 'Amazon Prime',
      profilePicture: 'https://via.placeholder.com/24x24',
      subscribers: 8200000,
      videos: 1000,
      isSubscribed: true,
    },
    views: 8200000,
    uploadDate: '2023-05-15',
    isLive: true,
  },
  {
    id: '2',
    title: 'Lord of Rings: The Rings of Power Official Trailer',
    thumbnail: 'https://via.placeholder.com/320x180',
    channel: {
      id: '1',
      username: 'Amazon Prime',
      profilePicture: 'https://via.placeholder.com/24x24',
      subscribers: 8200000,
      videos: 1000,
      isSubscribed: true,
    },
    views: 8200000,
    uploadDate: '2023-05-15',
    isTrailer: true,
  },
];

const mockShorts: User[] = [
  { id: '1', username: 'Benaf2', profilePicture: 'https://via.placeholder.com/48x48', subscribers: 1000, videos: 50, isSubscribed: false },
  { id: '2', username: 'Eli2st', profilePicture: 'https://via.placeholder.com/48x48', subscribers: 2000, videos: 75, isSubscribed: false },
  { id: '3', username: 'Rockyas', profilePicture: 'https://via.placeholder.com/48x48', subscribers: 1500, videos: 60, isSubscribed: false },
  { id: '4', username: 'Amirali', profilePicture: 'https://via.placeholder.com/48x48', subscribers: 3000, videos: 120, isSubscribed: false },
];

const categories = ['All', 'Game', 'UI', 'Figma', 'UI Designer', 'UX Design'];

export const HomeScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  const handleVideoOptions = useCallback((video: Video) => {
    // Handle video options (like, dislike, share, etc.)
    console.log('Video options for:', video.title);
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

  const renderShortsSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Shorts</Text>
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.shortsContainer}>
        {mockShorts.map((short) => (
          <View key={short.id} style={styles.shortItem}>
            <View style={styles.shortAvatar}>
              <Text style={styles.shortInitial}>{short.username.charAt(0)}</Text>
            </View>
            <Text style={styles.shortName} numberOfLines={1}>
              {short.username}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderCategoriesSection = () => (
    <View style={styles.section}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderVideosSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recommended</Text>
      <View style={styles.videosGrid}>
        {mockVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onPress={handleVideoPress}
            onOptionsPress={handleVideoOptions}
            variant="default"
            style={styles.videoCard}
          />
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        showLogo
        showSearch
        showNotifications
        showProfile
        profilePicture={mockUser.profilePicture}
        onLogoPress={() => console.log('Logo pressed')}
        onSearchPress={() => console.log('Search pressed')}
        onNotificationsPress={() => console.log('Notifications pressed')}
        onProfilePress={() => console.log('Profile pressed')}
      />
      
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderShortsSection()}
        {renderCategoriesSection()}
        {renderVideosSection()}
      </ScrollView>

      <BottomNavigation
        currentTab="home"
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
  
  section: {
    marginBottom: Spacing.xl,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.md,
  },
  
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  addButtonText: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  
  shortsContainer: {
    paddingHorizontal: Spacing.base,
  },
  
  shortItem: {
    alignItems: 'center',
    marginRight: Spacing.lg,
    width: 60,
  },
  
  shortAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  
  shortInitial: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  
  shortName: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
  },
  
  categoriesContainer: {
    paddingHorizontal: Spacing.base,
  },
  
  categoryButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surfaceLight,
    borderRadius: Layout.borderRadius.full,
    marginRight: Spacing.md,
  },
  
  categoryButtonActive: {
    backgroundColor: Colors.primary,
  },
  
  categoryText: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  
  categoryTextActive: {
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  videosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.base,
    justifyContent: 'space-between',
  },
  
  videoCard: {
    marginBottom: Spacing.lg,
  },
});