import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';
import AppHeader from '../../components/common/AppHeader';
import MiniPlayer from '../../components/common/MiniPlayer';

const LibraryScreen = ({ navigation }) => {
  const handleMiniPlayerPlay = () => {
    console.log('Mini player play');
  };

  const handleMiniPlayerClose = () => {
    console.log('Mini player close');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        showLogo={true}
        rightIcon="notifications"
        rightAction={() => console.log('Notifications')}
        showProfile={true}
        profileImage="https://via.placeholder.com/32x32/333333/FFFFFF?text=U"
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Library</Text>
          <Text style={styles.placeholderText}>
            Your saved videos, playlists, and downloads will appear here.
          </Text>
        </View>
      </ScrollView>

      {/* Mini Player */}
      <MiniPlayer
        thumbnail="https://via.placeholder.com/48x27/333333/FFFFFF?text=LP"
        title="Lord of Rings :The Rings of Power Official Trailer"
        source="Amazone prime"
        isVerified={true}
        onPlay={handleMiniPlayerPlay}
        onClose={handleMiniPlayerClose}
      />
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
  section: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minHeight: 400,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  placeholderText: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default LibraryScreen;
