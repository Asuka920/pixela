// src/contexts/DataContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { initialWorks, initialUsers } from '../data/mockData';
import { Work, Creator } from '../types';//'type'
import { useAuth } from './AuthContext';

interface DataContextType {
  works: Work[];
  users: Creator[];
  getWorkById: (id: number) => Work | undefined;
  getWorksByAuthorId: (authorId: string) => Work[];
  getCreatorById: (userId: string) => Creator | undefined;
  toggleLike: (workId: number) => void;
  addComment: (workId: number, commentText: string) => void;
  toggleFollow: (userId: string) => void;
  searchWorks: (keyword: string, category: string) => Work[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { profile } = useAuth();
  const [works, setWorks] = useState<Work[]>(initialWorks);
  const [users, setUsers] = useState<Creator[]>(initialUsers);

  const getWorkById = (id: number) => works.find(w => w.id === id);

  const getWorksByAuthorId = (authorId: string) => works.filter(w => w.authorId === authorId);

  const getCreatorById = (userId: string) => users.find(u => u.id === userId);

  const toggleLike = (workId: number) => {
    setWorks(prevWorks => 
      prevWorks.map(w => {
        if (w.id === workId) {
          const newLiked = !w.liked;
          const newLikes = newLiked ? w.likes + 1 : w.likes - 1;
          return { ...w, liked: newLiked, likes: newLikes };
        }
        return w;
      })
    );
  };

  const addComment = (workId: number, commentText: string) => {
    setWorks(prevWorks =>
      prevWorks.map(w => {
        if (w.id === workId) {
          const newComment = {
            userName: profile.name, //
            text: commentText,
            date: new Date().toLocaleDateString('ja-JP') //
          };
          return { ...w, comments: [...w.comments, newComment] };
        }
        return w;
      })
    );
  };

  const toggleFollow = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(u => 
        u.id === userId ? { ...u, following: !u.following } : u
      )
    );
  };

  const searchWorks = (keyword: string, category: string): Work[] => {
    const lowerKeyword = keyword.toLowerCase();
    return works.filter(work => {
      const keywordMatch = !keyword || 
        work.title.toLowerCase().includes(lowerKeyword) ||
        work.author.toLowerCase().includes(lowerKeyword) ||
        work.tags.some(tag => tag.toLowerCase().includes(lowerKeyword));
      const categoryMatch = !category || work.tags.includes(category);
      return keywordMatch && categoryMatch;
    }); //
  };

  const value = {
    works,
    users,
    getWorkById,
    getWorksByAuthorId,
    getCreatorById,
    toggleLike,
    addComment,
    toggleFollow,
    searchWorks
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};