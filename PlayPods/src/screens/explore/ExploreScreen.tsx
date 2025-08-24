import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TopNavigation } from '../../components/common/TopNavigation';
import { VideoCard } from '../../components/common/VideoCard';
import { BottomNavigation } from '../../components/common/BottomNavigation';
import { MiniPlayer } from '../../components/common/MiniPlayer';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Layout } from '../../constants/spacing';
import { Video } from '../../types';

// Mock data - In a real app, this would come from an API
const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Face Off: Chris Eubank Jr vs Conor Benn The countdown is well and truly on',
    thumbnail: 'https://via.placeholder.com/320x180',
    channel: {
      id: '1',
      username: 'Boxing Channel',
      profilePicture: 'https://via.placeholder.com/24x24',
      subscribers: 5000000,
      videos: 500,
      isSubscribed: false,
    },
    views: 8000000,
    uploadDate: '2023-09-26',
  },
  {
    id: '2',
    title: 'Los iPhone 14 Pro Max y 14 Pro traen una característica increíble see',
    thumbnail: 'https://via.placeholder.com/320x180',
    channel: {
      id: '2',
      username: 'Tech Review',
      profilePicture: 'https://via.placeholder.com/24x24',
      subscribers: 3000000,
      videos: 300,
      isSubscribed: false,
    },
    views: 8000000,
    uploadDate: '2023-09-26',
  },
  {
    id: '3',
    title: 'Warner Bros Games Avalanche: An Inside Look at the Hogwarts Legacy Game | Vision',
    thumbnail: 'https://via.placeholder.com/320x180',
    channel: {
      id: '3',
      username: 'Gaming News',
      profilePicture: 'https://via.placeholder.com/24x24',
      subscribers: 2000000,
      videos: 200,
      isSubscribed: false,
    },
    views: 8000000,
    uploadDate: '2023-09-26',
  },
  {
    id: '4',
    title: 'Lil Baby - Detox (Official Video) new arrived on this channel amazing',
    thumbnail: 'https://via.placeholder.com/320x180',
    channel: {
      id: '4',
      username: 'Music Channel',
      profilePicture: 'https://via.placeholder.com/24x24',
      subscribers: 1000000,
      videos: 100,
      isSubscribed: false,
    },
    views: 8000000,
    uploadDate: '2023-09-26',
  },
];

const categories = [
  { key: 'trend', label: 'Trend', icon: 'trending-up' },
  { key: 'music', label: 'Music', icon: 'musical-notes' },
  { key: 'gaming', label: 'Gaming', icon: 'game-controller' },
  { key: 'learning', label: 'Learning', icon: 'bulb' },
];

const sortOptions = ['Most views', 'Most recent', 'Most liked', 'Most commented'];

export const ExploreScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('trend');
  const [selectedSort, setSelectedSort] = useState('Most views');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
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

  const renderSearchSection = () => (
    <View style={styles.searchSection}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />
        <Text style={styles.searchPlaceholder}>Search</Text>
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <Ionicons name="filter" size={20} color={Colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );

  const renderCategoriesSection = () => (
    <View style={styles.section}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryButton,
              selectedCategory === category.key && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category.key)}
          >
            <Ionicons
              name={category.icon as any}
              size={20}
              color={selectedCategory === category.key ? Colors.textPrimary : Colors.textSecondary}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.key && styles.categoryTextActive,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderFiltersSection = () => (
    <View style={styles.filtersSection}>
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Date:</Text>
        <TouchableOpacity style={styles.filterDropdown}>
          <Text style={styles.filterValue}>News</Text>
          <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Sort by:</Text>
        <TouchableOpacity 
          style={styles.filterDropdown}
          onPress={() => setShowSortDropdown(!showSortDropdown)}
        >
          <Text style={styles.filterValue}>{selectedSort}</Text>
          <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      {showSortDropdown && (
        <View style={styles.sortDropdown}>
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

  const renderVideosSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Trending Now</Text>
      <View style={styles.videosList}>
        {mockVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onPress={handleVideoPress}
            onOptionsPress={handleVideoOptions}
            variant="compact"
            style={styles.videoCard}
          />
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        title="Explore"
        showBackButton
        variant="explore"
      />
      
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderSearchSection()}
        {renderCategoriesSection()}
        {renderFiltersSection()}
        {renderVideosSection()}
      </ScrollView>

      <BottomNavigation
        currentTab="explore"
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.lg,
  },
  
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.md,
  },
  
  searchPlaceholder: {
    color: Colors.textTertiary,
    fontSize: Typography.fontSize.base,
    marginLeft: Spacing.sm,
  },
  
  filterButton: {
    padding: Spacing.sm,
    backgroundColor: Colors.surfaceLight,
    borderRadius: Layout.borderRadius.md,
  },
  
  section: {
    marginBottom: Spacing.xl,
  },
  
  categoriesContainer: {
    paddingHorizontal: Spacing.base,
  },
  
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surfaceLight,
    borderRadius: Layout.borderRadius.md,
    marginRight: Spacing.md,
  },
  
  categoryButtonActive: {
    backgroundColor: Colors.primary,
  },
  
  categoryText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    marginLeft: Spacing.sm,
  },
  
  categoryTextActive: {
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  filtersSection: {
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.lg,
  },
  
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  
  filterLabel: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Layout.borderRadius.md,
    minWidth: 120,
  },
  
  filterValue: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.sm,
    marginRight: Spacing.sm,
  },
  
  sortDropdown: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: Spacing.sm,
    overflow: 'hidden',
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
  
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.md,
  },
  
  videosList: {
    paddingHorizontal: Spacing.base,
  },
  
  videoCard: {
    marginBottom: Spacing.md,
  },
});