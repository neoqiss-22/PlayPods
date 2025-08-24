import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import ChannelsHeader from './components/ChannelsHeader';
import SearchBar from './components/SearchBar';
import SortOptions from './components/SortOptions';
import ChannelsList from './components/ChannelsList';
import BottomNavigation from '../../components/common/BottomNavigation';

const ChannelsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('May you like that');

  return (
    <SafeAreaView style={styles.container}>
      <ChannelsHeader />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <SortOptions 
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <ChannelsList 
          searchQuery={searchQuery}
          sortBy={sortBy}
        />
      </ScrollView>
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

export default ChannelsScreen;