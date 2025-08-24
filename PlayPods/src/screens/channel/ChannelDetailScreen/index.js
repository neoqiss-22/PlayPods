import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import ChannelHeader from './components/ChannelHeader';
import ChannelInfo from './components/ChannelInfo';
import ChannelTabs from './components/ChannelTabs';
import NewsSection from './components/NewsSection';
import MiniPlayer from '../../components/common/MiniPlayer';
import BottomNavigation from '../../components/common/BottomNavigation';

const { width } = Dimensions.get('window');

const ChannelDetailScreen = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const tabs = ['Home', 'Video', 'Playlist', 'Community', 'Channels', 'Ab'];

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChannelHeader />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ChannelInfo 
          isSubscribed={isSubscribed}
          onSubscribe={handleSubscribe}
        />
        <ChannelTabs 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <NewsSection activeTab={activeTab} />
      </ScrollView>
      <MiniPlayer />
      <BottomNavigation activeTab="channels" />
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

export default ChannelDetailScreen;