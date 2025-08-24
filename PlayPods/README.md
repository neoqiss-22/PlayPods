# PlayPods - Video Platform App

A modern, dark-themed video platform built with React Native and Expo, featuring a beautiful UI design inspired by modern video streaming applications.

## 🎯 Features

- **Dark Theme UI**: Modern, sleek dark interface with red accents
- **Video Feed**: Personalized home feed with recommended content
- **Channel Management**: Browse and subscribe to channels
- **Video Player**: Full-featured video playback with controls
- **Search & Explore**: Discover new content with advanced filtering
- **Mini Player**: Continuous playback while browsing
- **Responsive Design**: Optimized for both iOS and Android

## 🏗️ Architecture

The app follows a clean, modular architecture with proper separation of concerns:

### Directory Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── AppHeader.js
│   │   ├── VideoCard.js
│   │   ├── ChannelAvatar.js
│   │   ├── CategoryButton.js
│   │   ├── MiniPlayer.js
│   │   ├── SearchBar.js
│   │   └── index.js
│   └── native/           # Platform-specific components
├── screens/
│   ├── home/            # Home screen with video feed
│   ├── explore/         # Content discovery screen
│   ├── channels/        # Channel browsing and management
│   ├── video/           # Video player screen
│   └── library/         # User's saved content
├── navigation/          # Navigation configuration
├── styles/              # Global styles and themes
├── hooks/               # Custom React hooks
└── utils/               # Utility functions
```

### Component Architecture

- **AppHeader**: Configurable header with logo, navigation, and actions
- **VideoCard**: Reusable video display component with metadata
- **ChannelAvatar**: Channel profile picture with name display
- **CategoryButton**: Interactive category filter buttons
- **MiniPlayer**: Persistent video player for continuous playback
- **SearchBar**: Search functionality with optional filters

## 🎨 Design System

### Color Palette
- **Primary Background**: `#000000` (Pure Black)
- **Secondary Background**: `#1A1A1A` (Dark Gray)
- **Surface Elements**: `#333333` (Medium Gray)
- **Accent Color**: `#FF4458` (Red)
- **Text Primary**: `#FFFFFF` (White)
- **Text Secondary**: `#CCCCCC` (Light Gray)

### Typography
- **Headings**: Bold, 18-24px
- **Body Text**: Regular, 14-16px
- **Captions**: Light, 12-14px

### Spacing
- **Container Padding**: 16px
- **Component Margins**: 8px, 16px, 24px
- **Border Radius**: 8px, 20px, 24px

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd PlayPods
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Run on your preferred platform
```bash
# iOS
npm run ios
# Android
npm run android
```

## 📱 Screens

### Home Screen
- Channel avatar carousel
- Category filters
- Video recommendations
- Mini player

### Explore Screen
- Search functionality
- Trend categories
- Filter options
- Content discovery

### Channels Screen
- Channel search
- Subscription management
- Channel listings

### Channel Home Screen
- Channel banner and profile
- Subscription button
- Navigation tabs
- Channel videos

### Video Player Screen
- Video playback
- Player controls
- Video details
- Action buttons
- Recommended videos

## 🔧 Technical Implementation

### State Management
- React hooks for local state
- Context API for global state (if needed)
- Proper state lifting for shared data

### Navigation
- React Navigation v7
- Stack navigation for screen transitions
- Tab navigation for main app sections

### Performance
- FlatList for efficient list rendering
- Image optimization with placeholders
- Lazy loading for video content

### Accessibility
- Proper touch targets
- Screen reader support
- High contrast design

## 🧪 Testing

The app includes comprehensive testing setup:
- Unit tests for components
- Integration tests for navigation
- E2E tests for user flows

## 📦 Dependencies

- **React Native**: Core framework
- **Expo**: Development platform
- **React Navigation**: Navigation library
- **Expo Vector Icons**: Icon library
- **React Native Gesture Handler**: Touch handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from modern video platforms
- React Native community for excellent tooling
- Expo team for the amazing development experience
