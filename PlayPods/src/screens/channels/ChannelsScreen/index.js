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
import MiniPlayer from '../../../components/common/MiniPlayer';

const ChannelsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('May you like that');

  // Mock data for channels
  const channels = [
    {
      id: '1',
      name: 'Soroushnrz',
      avatar: 'https://via.placeholder.com/60x60/333333/FFFFFF?text=S',
      subscribers: '1.2 k',
      videos: '42',
      isSubscribed: false,
    },
    {
      id: '2',
      name: 'Jacob Jones',
      avatar: 'https://via.placeholder.com/60x60/333333/FFFFFF?text=J',
      subscribers: '1 M',
      videos: '122',
      isSubscribed: true,
    },
    {
      id: '3',
      name: 'Cameron Williamson',
      avatar: 'https://via.placeholder.com/60x60/333333/FFFFFF?text=C',
      subscribers: '3 M',
      videos: '122',
      isSubscribed: true,
    },
    {
      id: '4',
      name: 'Devon Lane',
      avatar: 'https://via.placeholder.com/60x60/333333/FFFFFF?text=D',
      subscribers: '223 K',
      videos: '122',
      isSubscribed: true,
    },
    {
      id: '5',
      name: 'Brooklyn Simmons',
      avatar: 'https://via.placeholder.com/60x60/333333/FFFFFF?text=B',
      subscribers: '1.5 M',
      videos: '122',
      isSubscribed: true,
    },
    {
      id: '6',
      name: 'Jacob Jones',
      avatar: 'https://via.placeholder.com/60x60/333333/FFFFFF?text=J2',
      subscribers: '890 K',
      videos: '122',
      isSubscribed: true,
    },
    {
      id: '7',
      name: 'Jerome Bell',
      avatar: 'https://via.placeholder.com/60x60/333333/FFFFFF?text=JB',
      subscribers: '2.1 M',
      videos: '122',
      isSubscribed: true,
    },
  ];

  const handleChannelPress = (channel) => {
    // Navigate to channel page
    console.log('Channel pressed:', channel.name);
  };

  const handleSubscribePress = (channel) => {
    // Toggle subscription
    console.log('Subscribe pressed for:', channel.name);
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

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const renderChannelItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.channelItem} 
      onPress={() => handleChannelPress(item)}
    >
      <View style={styles.channelInfo}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
        </View>
        
        <View style={styles.channelDetails}>
          <Text style={styles.channelName}>{item.name}</Text>
          <Text style={styles.channelStats}>
            {item.subscribers} subscribers {item.videos} video
          </Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.subscribeButton,
          item.isSubscribed && styles.subscribedButton
        ]}
        onPress={() => handleSubscribePress(item)}
      >
        <Text style={[
          styles.subscribeText,
          item.isSubscribed && styles.subscribedText
        ]}>
          {item.isSubscribed ? 'Subscribed' : 'Subscrib'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        leftIcon="arrow-back"
        leftAction={handleBackPress}
        centerTitle="Channels"
        showProfile={true}
        profileImage="https://via.placeholder.com/32x32/333333/FFFFFF?text=U"
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <SearchBar
          placeholder="Search channel"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSearch={handleSearch}
        />

        {/* Sort Option */}
        <View style={styles.sortSection}>
          <TouchableOpacity style={styles.sortDropdown}>
            <Text style={styles.sortLabel}>Sort by: {sortBy}</Text>
            <Ionicons name="chevron-down" size={16} color="#CCCCCC" />
          </TouchableOpacity>
        </View>

        {/* Channels List */}
        <View style={styles.channelsSection}>
          <FlatList
            data={channels}
            renderItem={renderChannelItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
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
  sortSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sortDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    alignSelf: 'flex-start',
  },
  sortLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  channelsSection: {
    paddingHorizontal: 16,
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333333',
  },
  channelDetails: {
    flex: 1,
  },
  channelName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  channelStats: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  subscribeButton: {
    backgroundColor: '#FF4458',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
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
});

export default ChannelsScreen;