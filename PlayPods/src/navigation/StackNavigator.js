import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import VideoPlayerScreen from '../screens/video/VideoPlayerScreen';
import ChannelDetailScreen from '../screens/channel/ChannelDetailScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#121212' },
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      <Stack.Screen name="ChannelDetail" component={ChannelDetailScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;