import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import HomeHeader from './components/HomeHeader';
import ShortsSection from './components/ShortsSection';
import ContentFilters from './components/ContentFilters';
import VideoFeed from './components/VideoFeed';
import BottomNavigation from '../../components/common/BottomNavigation';

const HomeScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ShortsSection />
        <ContentFilters 
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
        />
        <VideoFeed selectedFilter={selectedFilter} />
      </ScrollView>
      <BottomNavigation activeTab="home" />
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

export default HomeScreen;
