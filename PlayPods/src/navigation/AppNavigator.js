import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import VideoPlayerScreen from '../screens/video/VideoPlayerScreen';
import ChannelHomeScreen from '../screens/channels/ChannelHomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#000000' },
        }}
      >
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
        <Stack.Screen name="ChannelHome" component={ChannelHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
