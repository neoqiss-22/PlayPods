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
import ChannelAvatar from '../../../components/common/ChannelAvatar';
import CategoryButton from '../../../components/common/CategoryButton';
import VideoCard from '../../../components/common/VideoCard';
import MiniPlayer from '../../../components/common/MiniPlayer';

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for channel avatars
  const channelAvatars = [
    { id: 'add', name: 'Your shorts', isAddButton: true },
    { id: '1', name: 'Benaf2', avatar: 'https://via.placeholder.com/60x60/333333/FFFFFF?text=B' },
    { id: '2', name: 'Eli2st', avatar: 'https://via.placeholder.com/60x60/333333/FFFFFF?text=E' },
    { id: '3', name: 'Rockyas', avatar: 'https://via.placeholder.com/60x60/333333/FFFFFF?text=R' },
    { id: '4', name: 'Amirali', avatar: 'https://via.placeholder.com/60x60/333333/FFFFFF?text=A' },
  ];

  // Mock data for categories
  const categories = ['All', 'Game', 'Ui', 'Figma', 'Ui designer', 'Ux design'];

  // Mock data for videos
  const videos = [
    {
      id: '1',
      thumbnail: 'https://via.placeholder.com/120x68/333333/FFFFFF?text=Adele',
      title: 'Adele - Easy On Me Live at the NRJ Awards 2021',
      channelName: 'Amazon prime',
      views: '8.2 M',
      timeAgo: '5 months ago',
      isLive: true,
    },
    {
      id: '2',
      thumbnail: 'https://via.placeholder.com/120x68/333333/FFFFFF?text=Galadriel',
      title: 'Lord of Rings: The Rings of Power Official Trailer',
      channelName: 'Amazon prime',
      views: '8.2 M',
      timeAgo: '5 months ago',
      isLive: false,
    },
  ];

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
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

  const handleNotifications = () => {
    console.log('Notifications pressed');
  };

  const handleProfile = () => {
    console.log('Profile pressed');
  };

  const handleAddShorts = () => {
    console.log('Add shorts pressed');
  };

  const handleChannelPress = (channel) => {
    console.log('Channel pressed:', channel.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        showLogo={true}
        rightIcon="notifications"
        rightAction={handleNotifications}
        showProfile={true}
        profileImage="https://via.placeholder.com/32x32/333333/FFFFFF?text=U"
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Channel Avatars Section */}
        <View style={styles.section}>
          <FlatList
            data={channelAvatars}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ChannelAvatar
                avatar={item.avatar}
                name={item.name}
                isAddButton={item.isAddButton}
                onPress={() => item.isAddButton ? handleAddShorts() : handleChannelPress(item)}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.avatarsContainer}
          />
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CategoryButton
                title={item}
                isSelected={selectedCategory === item}
                onPress={() => handleCategoryPress(item)}
              />
            )}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>

        {/* Videos Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended</Text>
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
  avatarsContainer: {
    paddingHorizontal: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
