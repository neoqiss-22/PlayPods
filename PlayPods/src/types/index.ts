export interface User {
  id: string;
  username: string;
  profilePicture: string;
  subscribers: number;
  videos: number;
  isSubscribed: boolean;
  biography?: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: User;
  views: number;
  uploadDate: string;
  duration?: string;
  isLive?: boolean;
  isTrailer?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  profilePicture: string;
  subscribers: number;
  videos: number;
  isSubscribed: boolean;
}

export interface Playlist {
  id: string;
  title: string;
  thumbnail: string;
  videoCount: number;
  channel: User;
}

export interface Comment {
  id: string;
  text: string;
  user: User;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export interface NavigationState {
  currentTab: 'home' | 'explore' | 'channels' | 'library';
  currentScreen: string;
}

export interface MiniPlayerState {
  isVisible: boolean;
  isPlaying: boolean;
  currentVideo: Video | null;
  currentTime: number;
  duration: number;
}

export interface AppState {
  navigation: NavigationState;
  miniPlayer: MiniPlayerState;
  user: User | null;
  subscriptions: Channel[];
  watchHistory: Video[];
}