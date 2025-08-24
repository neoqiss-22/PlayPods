import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  FlatList 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../../../components/common/AppHeader';
import SearchBar from '../../../components/common/SearchBar';
import CategoryButton from '../../../components/common/CategoryButton';
import VideoCard from '../../../components/common/VideoCard';
import MiniPlayer from '../../../components/common/MiniPlayer';

const ExploreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrend, setSelectedTrend] = useState('Trend');
  const [dateFilter, setDateFilter] = useState('News');
  const [sortBy, setSortBy] = useState('Most views');

  // Mock data for trend categories
  const trendCategories = [
    { id: 'trend', name: 'Trend', icon: 'trending-up' },
    { id: 'music', name: 'Music', icon: 'musical-notes' },
    { id: 'gaming', name: 'Gaming', icon: 'game-controller' },
    { id: 'learning', name: 'Learning', icon: 'bulb' },
  ];

  // Mock data for videos
  const videos = [
    {
      id: '1',
      thumbnail: 'https://via.placeholder.com/120x68/333333/FFFFFF?text=FACE+OFF',
      title: 'Face Off: Chris Eubank Jr vs Conor Benn The countdown is well and truly on',
      channelName: 'Boxing Channel',
      views: '8 M',
      timeAgo: '26 sep',
      isLive: false,
    },
    {
      id: '2',
      thumbnail: 'https://via.placeholder.com/120x68/333333/FFFFFF?text=BRUTAL',
      title: 'Los iPhone 14 Pro Max y 14 Pro traen una característica increíble see',
      channelName: 'Tech Review',
      views: '8 M',
      timeAgo: '26 sep',
      isLive: false,
    },
    {
      id: '3',
      thumbnail: 'https://via.placeholder.com/120x68/333333/FFFFFF?text=HOGWARTS',
      title: 'Warner Bros Games Avalanche: An Inside Look at the Hogwarts Legacy Game | Vision',
      channelName: 'Gaming News',
      views: '8 M',
      timeAgo: '26 sep',
      isLive: false,
    },
    {
      id: '4',
      thumbnail: 'https://via.placeholder.com/120x68/333333/FFFFFF?text=Lil+Baby',
      title: 'Lil Baby - Detox (Official Video) new arrived on this channel amazing',
      channelName: 'Music Channel',
      views: '8 M',
      timeAgo: '26 sep',
      isLive: false,
    },
  ];

  const handleTrendPress = (trend) => {
    setSelectedTrend(trend.name);
  };

  const handleVideoPress = (video) => {
    // Navigate to video player
    console.log('Video pressed:', video.title);
  };

  const handleVideoOptions = (video) => {
    console.log('Video options:', video.title);
  };

  const handleMiniPlayerPlay = () => {
    console.log('Mini player play');
  };

  const handleMiniPlayerClose = () => {
    console.log('Mini player close');
  };

  const handleSearch = () => {
    console.log('Search:', searchQuery);
  };

  const handleFilterPress = () => {
    console.log('Filter pressed');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleOptionsPress = () => {
    console.log('Options pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        leftIcon="arrow-back"
        leftAction={handleBackPress}
        centerTitle="Explore"
        rightIcon="ellipsis-vertical"
        rightAction={handleOptionsPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <SearchBar
          placeholder="Search videos, channels, and more..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSearch={handleSearch}
          showFilter={true}
          onFilterPress={handleFilterPress}
        />

        {/* Trend Categories */}
        <View style={styles.section}>
          <FlatList
            data={trendCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.trendButton,
                  selectedTrend === item.name && styles.selectedTrendButton
                ]}
                onPress={() => handleTrendPress(item)}
              >
                <Ionicons 
                  name={item.icon} 
                  size={20} 
                  color={selectedTrend === item.name ? '#FF4458' : '#FFFFFF'} 
                />
                <Text style={[
                  styles.trendText,
                  selectedTrend === item.name && styles.selectedTrendText
                ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.trendsContainer}
          />
        </View>

        {/* Filter Dropdowns */}
        <View style={styles.filtersSection}>
          <TouchableOpacity style={styles.filterDropdown}>
            <Text style={styles.filterLabel}>Date: {dateFilter}</Text>
            <Ionicons name="chevron-down" size={16} color="#CCCCCC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterDropdown}>
            <Text style={styles.filterLabel}>Sort by: {sortBy}</Text>
            <Ionicons name="chevron-down" size={16} color="#CCCCCC" />
          </TouchableOpacity>
        </View>

        {/* Videos Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              thumbnail={video.thumbnail}
              title={video.title}
              channelName={video.channelName}
              views={video.views}
              timeAgo={video.timeAgo}
              isLive={video.isLive}
              onPress={() => handleVideoPress(video)}
              onOptionsPress={() => handleVideoOptions(video)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Mini Player */}
      <MiniPlayer
        thumbnail="https://via.placeholder.com/48x27/333333/FFFFFF?text=LP"
        title="Lord of Rings :The Rings of Power Official Trailer"
        source="Amazone prime"
        isVerified={true}
        onPlay={handleMiniPlayerPlay}
        onClose={handleMiniPlayerClose}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  trendsContainer: {
    paddingHorizontal: 16,
  },
  trendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedTrendButton: {
    backgroundColor: '#1A1A1A',
    borderColor: '#FF4458',
  },
  trendText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  selectedTrendText: {
    color: '#FF4458',
  },
  filtersSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  filterLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});

export default ExploreScreen;
