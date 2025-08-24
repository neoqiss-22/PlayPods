import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChannelsList = ({ searchQuery, sortBy }) => {
  const [subscriptions, setSubscriptions] = useState({
    1: false, // Soroushnrz - not subscribed
    2: true,  // Jacob Jones - subscribed
    3: true,  // Cameron Williamson - subscribed
    4: true,  // Devon Lane - subscribed
    5: true,  // Brooklyn Simmons - subscribed
    6: true,  // Jacob Jones - subscribed
    7: true,  // Jerome Bell - subscribed
  });

  const channels = [
    {
      id: 1,
      name: 'Soroushnrz',
      subscribers: '1.2 k',
      videos: '42 videos',
      isSubscribed: false,
    },
    {
      id: 2,
      name: 'Jacob Jones',
      subscribers: '1 M',
      videos: '122 video',
      isSubscribed: true,
    },
    {
      id: 3,
      name: 'Cameron Williamson',
      subscribers: '3 M',
      videos: '122 video',
      isSubscribed: true,
    },
    {
      id: 4,
      name: 'Devon Lane',
      subscribers: '223 K',
      videos: '122 video',
      isSubscribed: true,
    },
    {
      id: 5,
      name: 'Brooklyn Simmons',
      subscribers: '1.5 M',
      videos: '122 video',
      isSubscribed: true,
    },
    {
      id: 6,
      name: 'Jacob Jones',
      subscribers: '890 K',
      videos: '122 video',
      isSubscribed: true,
    },
    {
      id: 7,
      name: 'Jerome Bell',
      subscribers: '2.1 M',
      videos: '122 video',
      isSubscribed: true,
    },
  ];

  const handleSubscribe = (channelId) => {
    setSubscriptions(prev => ({
      ...prev,
      [channelId]: !prev[channelId]
    }));
  };

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {filteredChannels.map((channel) => (
        <TouchableOpacity key={channel.id} style={styles.channelCard}>
          <View style={styles.channelInfo}>
            <View style={styles.profilePicture}>
              <Ionicons name="person" size={20} color="#FFFFFF" />
            </View>
            
            <View style={styles.channelDetails}>
              <Text style={styles.channelName}>{channel.name}</Text>
              <Text style={styles.channelStats}>
                {channel.subscribers} subscribers {channel.videos}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={[
              styles.subscribeButton,
              subscriptions[channel.id] && styles.subscribedButton
            ]}
            onPress={() => handleSubscribe(channel.id)}
          >
            <Text style={styles.subscribeText}>
              {subscriptions[channel.id] ? 'Subscribed' : 'Subscrib'}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for bottom navigation
  },
  channelCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profilePicture: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  channelDetails: {
    flex: 1,
  },
  channelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  channelStats: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  subscribeButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  subscribedButton: {
    backgroundColor: '#2A2A2A',
  },
  subscribeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ChannelsList;