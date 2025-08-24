import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ShortsSection = () => {
  const shortsData = [
    { id: 1, name: 'Your shorts', isAdd: true },
    { id: 2, name: 'Benaf2' },
    { id: 3, name: 'Eli2st' },
    { id: 4, name: 'Rockyas' },
    { id: 5, name: 'Amirali' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {shortsData.map((short) => (
          <TouchableOpacity key={short.id} style={styles.shortItem}>
            <View style={styles.profileContainer}>
              {short.isAdd ? (
                <View style={styles.addProfile}>
                  <Ionicons name="add" size={24} color="#FF0000" />
                </View>
              ) : (
                <View style={styles.profilePicture}>
                  <Ionicons name="person" size={20} color="#FFFFFF" />
                </View>
              )}
            </View>
            <Text style={styles.shortName}>{short.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  shortItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  profileContainer: {
    marginBottom: 8,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addProfile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#FF0000',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shortName: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default ShortsSection;