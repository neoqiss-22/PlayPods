import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChannelInfo = ({ isSubscribed, onSubscribe }) => {
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <View style={styles.profilePicture}>
          <Ionicons name="person" size={32} color="#FFFFFF" />
        </View>
        
        <View style={styles.channelDetails}>
          <Text style={styles.channelName}>Soroushnrz</Text>
          
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
        </View>
      </View>
      
      {/* Channel Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Ionicons name="notifications" size={20} color="#AAAAAA" />
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statText}>1.2 k subscribers</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statText}>42 videos</Text>
        </View>
      </View>
      
      {/* Biography */}
      <View style={styles.biographySection}>
        <Text style={styles.biographyLabel}>Biography</Text>
        <Ionicons name="chevron-down" size={16} color="#AAAAAA" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  channelDetails: {
    flex: 1,
  },
  channelName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subscribeButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  subscribedButton: {
    backgroundColor: '#2A2A2A',
  },
  subscribeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  biographySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  biographyLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ChannelInfo;