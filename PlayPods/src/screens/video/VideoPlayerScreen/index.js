import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import VideoPlayer from './components/VideoPlayer';
import VideoDetails from './components/VideoDetails';
import ActionButtons from './components/ActionButtons';
import RelatedVideos from './components/RelatedVideos';
import BottomNavigation from '../../components/common/BottomNavigation';

const { width, height } = Dimensions.get('window');

const VideoPlayerScreen = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <VideoPlayer />
        <VideoDetails 
          isSubscribed={isSubscribed}
          onSubscribe={handleSubscribe}
        />
        <ActionButtons 
          isLiked={isLiked}
          isDisliked={isDisliked}
          onLike={handleLike}
          onDislike={handleDislike}
        />
        <RelatedVideos />
      </ScrollView>
      <BottomNavigation activeTab="explore" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
  },
});

export default VideoPlayerScreen;