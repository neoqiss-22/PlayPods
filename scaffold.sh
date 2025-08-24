#!/bin/bash

# PlayPods React Native Project Scaffold Script
# Run this script to create the complete folder structure for PlayPods

echo "🚀 Creating PlayPods React Native project structure..."

# Create the main project directory
mkdir -p PlayPods
cd PlayPods

echo "📱 Initializing React Native project..."
npx react-native init PlayPods --version latest
cd PlayPods

echo "📁 Creating source directory structure..."

# Main src directory
mkdir -p src

# Components structure
mkdir -p src/components/common/{Button,Input,Modal,LoadingSpinner,SafeArea}
mkdir -p src/components/media/{VideoPlayer,VideoThumbnail,VideoControls,ProgressBar,QualitySelector}
mkdir -p src/components/cards/{VideoCard,ChannelCard,PlaylistCard,UserCard}
mkdir -p src/components/lists/{VideoList,ChannelList,CommentList,NotificationList}

# Screens structure
mkdir -p src/screens/auth/{LoginScreen,SignupScreen,ForgotPasswordScreen,VerificationScreen}
mkdir -p src/screens/home/{HomeScreen,TrendingScreen,RecommendedScreen}
mkdir -p src/screens/explore/{ExploreScreen,SearchScreen,CategoryScreen,TagScreen}
mkdir -p src/screens/video/{VideoWatchScreen,VideoUploadScreen,VideoEditScreen,LiveStreamScreen}
mkdir -p src/screens/channel/{ChannelScreen,ChannelEditScreen,SubscriptionsScreen,ChannelAnalyticsScreen}
mkdir -p src/screens/profile/{ProfileScreen,SettingsScreen,EditProfileScreen,HistoryScreen}
mkdir -p src/screens/library/{LibraryScreen,PlaylistScreen,DownloadsScreen,WatchLaterScreen}
mkdir -p src/screens/community/{CommunityScreen,CommentsScreen,MessagingScreen}

# Navigation
mkdir -p src/navigation

# Services
mkdir -p src/services/api
mkdir -p src/services/storage
mkdir -p src/services/media
mkdir -p src/services/notifications
mkdir -p src/services/analytics

# Hooks
mkdir -p src/hooks

# Context
mkdir -p src/context

# Utils
mkdir -p src/utils/{helpers,constants,permissions,security}

# Styles
mkdir -p src/styles

# Store (Redux/Zustand)
mkdir -p src/store/{slices,middleware,selectors}

# Assets
mkdir -p src/assets/{images/{icons,logos,placeholders,backgrounds},videos/samples,fonts,sounds}

# Config
mkdir -p src/config

# Types (if using TypeScript later)
mkdir -p src/types

# Tests
mkdir -p __tests__/{components,screens,services,utils,__mocks__}

# Documentation
mkdir -p docs

# Scripts
mkdir -p scripts

echo "📝 Creating initial files..."

# Create index files for components
cat > src/components/common/Button/index.js << 'EOF'
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, style, textStyle, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF4458',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: '#CCCCCC',
  },
});

export default Button;
EOF

cat > src/components/common/Button/Button.styles.js << 'EOF'
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
    backgroundColor: '#FF4458',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: '#CCCCCC',
  },
});
EOF

# Create navigation files
cat > src/navigation/AppNavigator.js << 'EOF'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import { useAuth } from '../hooks/useAuth';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
EOF

cat > src/navigation/TabNavigator.js << 'EOF'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import ExploreScreen from '../screens/explore/ExploreScreen';
import LibraryScreen from '../screens/library/LibraryScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: '#333333',
        },
        tabBarActiveTintColor: '#FF4458',
        tabBarInactiveTintColor: '#CCCCCC',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
EOF

# Create basic screen files
cat > src/screens/home/HomeScreen/index.js << 'EOF'
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>PlayPods</Text>
        <Text style={styles.subtitle}>Welcome to the future of video!</Text>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#CCCCCC',
  },
});

export default HomeScreen;
EOF

cat > src/screens/explore/ExploreScreen/index.js << 'EOF'
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const ExploreScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>Discover new content</Text>
      </View>
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

export default ExploreScreen;
EOF

cat > src/screens/library/LibraryScreen/index.js << 'EOF'
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const LibraryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Library</Text>
        <Text style={styles.subtitle}>Your saved content</Text>
      </View>
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
EOF

# Create hooks
cat > src/hooks/useAuth.js << 'EOF'
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Add your auth check logic here
      // For now, we'll simulate a check
      setTimeout(() => {
        setLoading(false);
        // setIsAuthenticated(true); // Uncomment when auth is implemented
      }, 1000);
    } catch (error) {
      console.error('Auth check failed:', error);
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Add your login logic here
      console.log('Login attempt:', email);
      // On success:
      // setIsAuthenticated(true);
      // setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Add your logout logic here
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };
};
EOF

# Create constants
cat > src/utils/constants/colors.js << 'EOF'
export const COLORS = {
  PRIMARY: '#FF4458',
  SECONDARY: '#FF6B7A',
  BACKGROUND: '#000000',
  SURFACE: '#1A1A1A',
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#CCCCCC',
  TEXT_MUTED: '#888888',
  BORDER: '#333333',
  SUCCESS: '#4CAF50',
  WARNING: '#FF9800',
  ERROR: '#F44336',
  INFO: '#2196F3',
};
EOF

cat > src/utils/constants/api.js << 'EOF'
export const API_ENDPOINTS = {
  BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  VIDEOS: {
    GET_ALL: '/videos',
    GET_BY_ID: '/videos/:id',
    UPLOAD: '/videos/upload',
    DELETE: '/videos/:id',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
  },
};
EOF

# Create styles
cat > src/styles/globalStyles.js << 'EOF'
import { StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants/colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
EOF

# Create environment files
cat > .env << 'EOF'
# PlayPods Environment Variables
API_BASE_URL=http://localhost:8000/api
APP_NAME=PlayPods
VERSION=1.0.0

# Add your environment variables here
# FIREBASE_API_KEY=your_key_here
# AMPLITUDE_API_KEY=your_key_here
EOF

cat > .env.development << 'EOF'
# Development Environment
API_BASE_URL=http://localhost:8000/api
DEBUG=true
LOG_LEVEL=debug
EOF

cat > .env.production << 'EOF'
# Production Environment
API_BASE_URL=https://api.playpods.com
DEBUG=false
LOG_LEVEL=error
EOF

# Create documentation
cat > docs/ARCHITECTURE.md << 'EOF'
# PlayPods Architecture

## Overview
PlayPods is built with React Native using a scalable, modular architecture.

## Key Principles
1. **Separation of Concerns**: Each module has a single responsibility
2. **Reusability**: Components are designed to be reusable
3. **Testability**: Code is structured to be easily testable
4. **Scalability**: Architecture supports growth and team expansion

## Structure
- `src/components/`: Reusable UI components
- `src/screens/`: Screen-level components
- `src/services/`: Business logic and API calls
- `src/hooks/`: Custom React hooks
- `src/utils/`: Utility functions and constants

## State Management
We use React Context for global state management, with the option to migrate to Redux/Zustand as the app grows.

## Navigation
React Navigation v6 with stack and tab navigators.
EOF

cat > README.md << 'EOF'
# PlayPods

A next-generation video sharing platform built with React Native.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Install iOS dependencies (iOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Run the app:
   ```bash
   # Android
   npm run android
   # or
   yarn android

   # iOS
   npm run ios
   # or
   yarn ios
   ```

## Project Structure

See `docs/ARCHITECTURE.md` for detailed information about the project structure.

## Contributing

Please read `docs/CONTRIBUTING.md` before contributing to this project.

## License

This project is proprietary software. All rights reserved.
EOF

# Create package.json scripts section (this will be added to the existing package.json)
echo ""
echo "📦 Installing additional dependencies..."
npm install --save @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context

echo ""
echo "✅ PlayPods project structure created successfully!"
echo ""
echo "🎉 Next steps:"
echo "1. cd PlayPods/PlayPodsApp"
echo "2. Install iOS pods: cd ios && pod install && cd .."
echo "3. Start development: npm start"
echo "4. Run on device: npm run android or npm run ios"
echo ""
echo "📱 Happy coding! Your PlayPods empire starts here! 🚀"
