// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { initialMyProfile } from '../data/mockData';
import { UserProfile, SnsLinks } from '../types';//'type'

interface AuthContextType {
  isLoggedIn: boolean;
  profile: UserProfile;
  toggleLoginState: () => void;
  updateProfile: (name: string, bio: string, sns: SnsLinks, skills: string[], jobStatus: 'accepting' | 'discussion' | 'closed') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(initialMyProfile);

  const toggleLoginState = () => {
    setIsLoggedIn(prev => !prev);
  };

  const updateProfile = (name: string, bio: string, sns: SnsLinks, skills: string[], jobStatus: 'accepting' | 'discussion' | 'closed') => {
    setProfile(prev => ({
      ...prev,
      name,
      bio,
      sns,
      skills,
      jobStatus,
    }));
    alert('プロフィールが更新されました！'); //
  };

  const value = {
    isLoggedIn,
    profile,
    toggleLoginState,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};