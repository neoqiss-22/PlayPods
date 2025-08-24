import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../../../components/common/AppHeader';
import VideoCard from '../../../components/common/VideoCard';
import MiniPlayer from '../../../components/common/MiniPlayer';

const ChannelHomeScreen = ({ navigation, route }) => {
  const [selectedTab, setSelectedTab] = useState('Home');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Mock channel data
  const channel = {
    name: 'Soroushnrz',
    banner: 'https://via.placeholder.com/400x200/333333/FFFFFF?text=Banner',
    avatar: 'https://via.placeholder.com/80x80/333333/FFFFFF?text=S',
    subscribers: '1.2 k',
    videos: '42',
    biography: 'Creative content creator sharing amazing videos...',
  };

  // Mock video data
  const videos = [
    {
      id: '1',
      thumbnail: 'https://via.placeholder.com/120x68/333333/FFFFFF?text=3D+Sphere',
      title: 'How to design a Phone app UI In Figma Step By Step | Figma Tutorial | 2022 UI',
      channelName: 'Soroushnrz',
      views: '8 M',
      timeAgo: '26 sep',
      isLive: false,
    },
    {
      id: '2',
      thumbnail: 'https://via.placeholder.com/120x68/333333/FFFFFF?text=Striped+Sphere',
      title: 'Advanced Figma Techniques for Professional Designers',
      channelName: 'Soroushnrz',
      views: '5.2 M',
      timeAgo: '1 week ago',
      isLive: false,
    },
    {
      id: '3',
      thumbnail: 'https://via.placeholder.com/120x68/333333/FFFFFF?text=Cutout+Sphere',
      title: 'UI/UX Design Principles Every Developer Should Know',
      channelName: 'Soroushnrz',
      views: '3.8 M',
      timeAgo: '2 weeks ago',
      isLive: false,
    },
  ];

  const tabs = ['Home', 'Video', 'Playlist', 'Community', 'Channels', 'Ab'];

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  const handleSubscribePress = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleVideoPress = (video) => {
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

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleOptionsPress = () => {
    console.log('Options pressed');
  };

  const handleBiographyPress = () => {
    console.log('Biography pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        leftIcon="arrow-back"
        leftAction={handleBackPress}
        rightIcon="ellipsis-vertical"
        rightAction={handleOptionsPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Channel Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.banner} />
        </View>

        {/* Channel Info */}
        <View style={styles.channelInfo}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar} />
          </View>
          
          <View style={styles.channelDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.channelName}>{channel.name}</Text>
              <TouchableOpacity 
                style={[
                  styles.subscribeButton,
                  isSubscribed && styles.subscribedButton
                ]}
                onPress={handleSubscribePress}
              >
                <Text style={[
                  styles.subscribeText,
                  isSubscribed && styles.subscribedText
                ]}>
                  {isSubscribed ? 'Subscribed' : 'Subscrib'}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.statsRow}>
              <TouchableOpacity style={styles.bellButton}>
                <Ionicons name="notifications" size={20} color="#CCCCCC" />
              </TouchableOpacity>
              <Text style={styles.statsText}>
                {channel.subscribers} subscribers • {channel.videos} videos
              </Text>
            </View>
            
            <TouchableOpacity style={styles.biographyButton} onPress={handleBiographyPress}>
              <Text style={styles.biographyText} numberOfLines={2}>
                {channel.biography}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#CCCCCC" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabsContainer}>
          <FlatList
            data={tabs}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab === item && styles.selectedTab
                ]}
                onPress={() => handleTabPress(item)}
              >
                <Text style={[
                  styles.tabText,
                  selectedTab === item && styles.selectedTabText
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.tabsContent}
          />
        </View>

        {/* Videos Section */}
        <View style={styles.videosSection}>
          <Text style={styles.sectionTitle}>News</Text>
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
  bannerContainer: {
    height: 120,
    marginBottom: 16,
  },
  banner: {
    flex: 1,
    backgroundColor: '#333333',
  },
  channelInfo: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333333',
  },
  channelDetails: {
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  channelName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 16,
  },
  subscribeButton: {
    backgroundColor: '#FF4458',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  subscribedButton: {
    backgroundColor: '#333333',
  },
  subscribeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  subscribedText: {
    color: '#CCCCCC',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bellButton: {
    marginRight: 8,
  },
  statsText: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  biographyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 300,
  },
  biographyText: {
    color: '#CCCCCC',
    fontSize: 14,
    textAlign: 'center',
    marginRight: 8,
  },
  tabsContainer: {
    marginBottom: 24,
  },
  tabsContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedTab: {
    borderBottomColor: '#FF4458',
  },
  tabText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedTabText: {
    color: '#FF4458',
  },
  videosSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
});

export default ChannelHomeScreen;