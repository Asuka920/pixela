// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { initialMyProfile } from '../data/mockData';
import { UserProfile, SnsLinks } from '../types';//'type'

interface AuthContextType {
  isLoggedIn: boolean;
  userType: 'user' | 'staff' | null;
  profile: UserProfile;
  login: (type: 'user' | 'staff') => void;
  logout: () => void;
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
  const [userType, setUserType] = useState<'user' | 'staff' | null>(null);
  const [profile, setProfile] = useState<UserProfile>(initialMyProfile);

  const login = (type: 'user' | 'staff') => {
    setIsLoggedIn(true);
    setUserType(type);
    if (type === 'staff') {
      // スタッフ用ダミープロフィール
      setProfile({
        ...initialMyProfile,
        name: '管理スタッフT',
        bio: 'Pixelaの管理スタッフです。',
        skills: [],
        jobStatus: 'closed'
      });
    } else {
      setProfile(initialMyProfile);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setProfile(initialMyProfile);
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
    userType,
    profile,
    login,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};