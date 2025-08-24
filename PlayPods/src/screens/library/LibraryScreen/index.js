import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import BottomNavigation from '../../components/common/BottomNavigation';

const LibraryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Library</Text>
        <Text style={styles.subtitle}>Your saved content and playlists</Text>
      </View>
      <BottomNavigation activeTab="library" />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
  },
});

export default LibraryScreen;
