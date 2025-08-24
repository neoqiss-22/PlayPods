import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ActionButtons = ({ isLiked, isDisliked, onLike, onDislike }) => {
  return (
    <View style={styles.container}>
      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={[styles.actionButton, isLiked && styles.actionButtonActive]} 
          onPress={onLike}
        >
          <Ionicons 
            name={isLiked ? "thumbs-up" : "thumbs-up-outline"} 
            size={24} 
            color={isLiked ? "#FF0000" : "#FFFFFF"} 
          />
          <Text style={[styles.actionText, isLiked && styles.actionTextActive]}>
            1.4 K
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, isDisliked && styles.actionButtonActive]} 
          onPress={onDislike}
        >
          <Ionicons 
            name={isDisliked ? "thumbs-down" : "thumbs-down-outline"} 
            size={24} 
            color={isDisliked ? "#FF0000" : "#FFFFFF"} 
          />
          <Text style={[styles.actionText, isDisliked && styles.actionTextActive]}>
            3.8 K
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={24} color="#FFFFFF" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="download-outline" size={24} color="#FFFFFF" />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="bookmark-outline" size={24} color="#FFFFFF" />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionButtonActive: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  actionTextActive: {
    color: '#FF0000',
    fontWeight: '600',
  },
});

export default ActionButtons;