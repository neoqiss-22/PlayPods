import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../../../components/common/AppHeader';
import VideoCard from '../../../components/common/VideoCard';

const { width } = Dimensions.get('window');

const VideoPlayerScreen = ({ navigation, route }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentTime, setCurrentTime] = useState('2:20');
  const [totalTime, setTotalTime] = useState('4:20');

  // Mock video data
  const video = {
    title: 'The Rings of Power Official Trailer',
    channelName: 'Amazone prime',
    subscribers: '8 M',
    views: '8.2 M',
    likes: '1.4 K',
    dislikes: '3.8 K',
  };

  // Mock recommended videos
  const recommendedVideos = [
    {
      id: '1',
      thumbnail: 'https://via.placeholder.com/120x68/333333/FFFFFF?text=Hood',
      title: 'ASSASSIN\'S CREED Full Movie Cinematic (2022) 4K ULTRA HD Action Fantasy',
      channelName: 'Amazone prime',
      subscribers: '8 M',
    },
    {
      id: '2',
      thumbnail: 'https://via.placeholder.com/120x68/333333/FFFFFF?text=Silent+Hill',
      title: 'P.T. SILENT HILLS Full HD 1080p/60fps Longplay Walkthrough',
      channelName: 'Amazone prime',
      subscribers: '8 M',
    },
  ];

  const handleSubscribePress = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleVideoPress = (video) => {
    console.log('Video pressed:', video.title);
  };

  const handleVideoOptions = (video) => {
    console.log('Video options:', video.title);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePlayPress = () => {
    console.log('Play pressed');
  };

  const handleFullScreenPress = () => {
    console.log('Full screen pressed');
  };

  const handleSettingsPress = () => {
    console.log('Settings pressed');
  };

  const handleLikePress = () => {
    console.log('Like pressed');
  };

  const handleDislikePress = () => {
    console.log('Dislike pressed');
  };

  const handleSharePress = () => {
    console.log('Share pressed');
  };

  const handleDownloadPress = () => {
    console.log('Download pressed');
  };

  const handleSavePress = () => {
    console.log('Save pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        leftIcon="arrow-back"
        leftAction={handleBackPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Video Player */}
        <View style={styles.videoContainer}>
          <View style={styles.videoFrame}>
            {/* Video placeholder */}
            <View style={styles.videoPlaceholder} />
            
            {/* Play Button */}
            <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
              <Ionicons name="play" size={40} color="#FFFFFF" />
            </TouchableOpacity>
            
            {/* Video Controls Overlay */}
            <View style={styles.controlsOverlay}>
              {/* Top Controls */}
              <View style={styles.topControls}>
                <TouchableOpacity style={styles.controlButton} onPress={handleSettingsPress}>
                  <Ionicons name="settings" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              
              {/* Bottom Controls */}
              <View style={styles.bottomControls}>
                <View style={styles.timeInfo}>
                  <Text style={styles.timeText}>{currentTime}</Text>
                  <Text style={styles.timeText}> / {totalTime}</Text>
                </View>
                
                <TouchableOpacity style={styles.controlButton} onPress={handleFullScreenPress}>
                  <Ionicons name="expand" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Video Details */}
        <View style={styles.videoDetails}>
          <Text style={styles.videoTitle}>{video.title}</Text>
          
          <View style={styles.channelRow}>
            <View style={styles.channelInfo}>
              <View style={styles.channelAvatar} />
              <View style={styles.channelText}>
                <Text style={styles.channelName}>{video.channelName}</Text>
                <Text style={styles.subscriberCount}>{video.subscribers} subscribers</Text>
              </View>
            </View>
            
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
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLikePress}>
            <Ionicons name="thumbs-up" size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>{video.likes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleDislikePress}>
            <Ionicons name="thumbs-down" size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>{video.dislikes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleSharePress}>
            <Ionicons name="share" size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleDownloadPress}>
            <Ionicons name="download" size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>Download</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleSavePress}>
            <Ionicons name="bookmark" size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Recommended Videos */}
        <View style={styles.recommendedSection}>
          <Text style={styles.sectionTitle}>Maybe you like that</Text>
          {recommendedVideos.map((video) => (
            <VideoCard
              key={video.id}
              thumbnail={video.thumbnail}
              title={video.title}
              channelName={video.channelName}
              views={video.subscribers}
              timeAgo=""
              isLive={false}
              onPress={() => handleVideoPress(video)}
              onOptionsPress={() => handleVideoOptions(video)}
            />
          ))}
        </View>
      </ScrollView>
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
  videoContainer: {
    marginBottom: 16,
  },
  videoFrame: {
    width: width,
    height: (width * 9) / 16, // 16:9 aspect ratio
    position: 'relative',
  },
  videoPlaceholder: {
    flex: 1,
    backgroundColor: '#333333',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 16,
  },
  topControls: {
    alignItems: 'flex-end',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeInfo: {
    flexDirection: 'row',
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoDetails: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    lineHeight: 24,
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  channelAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    marginRight: 12,
  },
  channelText: {
    flex: 1,
  },
  channelName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  subscriberCount: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  subscribeButton: {
    backgroundColor: '#FF4458',
    paddingHorizontal: 20,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
    marginBottom: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
  },
  recommendedSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
});

export default VideoPlayerScreen;