import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VideoDetails = ({ isSubscribed, onSubscribe }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.videoTitle}>
        The Rings of Power Official Trailer
      </Text>
      
      <View style={styles.channelInfo}>
        <View style={styles.channelLeft}>
          <View style={styles.channelPicture}>
            <Ionicons name="person" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.channelDetails}>
            <Text style={styles.channelName}>Amazone prime</Text>
            <Text style={styles.subscriberCount}>8 M subscribers</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.expandButton}>
          <Ionicons name="chevron-down" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        style={[
          styles.subscribeButton,
          isSubscribed && styles.subscribedButton
        ]}
        onPress={onSubscribe}
      >
        <Text style={styles.subscribeText}>
          {isSubscribed ? 'Subscribed' : 'Subscrib'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.notificationButton}>
        <Ionicons 
          name={isSubscribed ? "notifications" : "notifications-off"} 
          size={20} 
          color={isSubscribed ? "#FF0000" : "#AAAAAA"} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    lineHeight: 24,
  },
  channelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  channelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelPicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  channelDetails: {
    flex: 1,
  },
  channelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  subscriberCount: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  expandButton: {
    padding: 8,
  },
  subscribeButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  subscribedButton: {
    backgroundColor: '#2A2A2A',
  },
  subscribeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  notificationButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },
});

export default VideoDetails;