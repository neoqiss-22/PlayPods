import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import ExploreHeader from './components/ExploreHeader';
import SearchBar from './components/SearchBar';
import CategoryTabs from './components/CategoryTabs';
import FilterOptions from './components/FilterOptions';
import TrendingVideos from './components/TrendingVideos';
import BottomNavigation from '../../components/common/BottomNavigation';

const ExploreScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Trend');
  const [selectedDate, setSelectedDate] = useState('News');
  const [selectedSort, setSelectedSort] = useState('Most views');

  return (
    <SafeAreaView style={styles.container}>
      <ExploreHeader />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SearchBar />
        <CategoryTabs 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <FilterOptions 
          selectedDate={selectedDate}
          selectedSort={selectedSort}
          onDateChange={setSelectedDate}
          onSortChange={setSelectedSort}
        />
        <TrendingVideos 
          selectedCategory={selectedCategory}
          selectedDate={selectedDate}
          selectedSort={selectedSort}
        />
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

export default ExploreScreen;
