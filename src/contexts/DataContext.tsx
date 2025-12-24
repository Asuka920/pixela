// src/contexts/DataContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { initialWorks, initialUsers, initialReports } from '../data/mockData';
import { Work, Creator, Report, Comment } from '../types';//'type'
import { useAuth } from './AuthContext';

interface DataContextType {
  works: Work[];
  users: Creator[];
  reports: Report[];
  getWorkById: (id: number) => Work | undefined;
  getWorksByAuthorId: (authorId: string) => Work[];
  getCreatorById: (userId: string) => Creator | undefined;
  toggleLike: (workId: number) => void;
  addComment: (workId: number, commentText: string) => void;
  toggleFollow: (userId: string) => void;
  searchWorks: (keyword: string, category: string) => Work[];
  updateWork: (work: Work) => void;
  deleteWork: (id: number) => void;
  handleReportComment: (workId: number, comment: Comment) => void;
  deleteComment: (workId: number, commentId: string) => void;
  markReportAsRead: (reportId: string) => void;
  deleteSelectedComments: (reportIds: string[]) => void;
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
  const [reports, setReports] = useState<Report[]>(initialReports);

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
            id: `nc-${Date.now()}`, // Generate unique ID
            userName: profile.name || 'ゲストユーザー',
            userId: profile.id || undefined, // Add userId if logged in
            text: commentText,
            date: new Date().toLocaleDateString('ja-JP')
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

  const updateWork = (updatedWork: Work) => {
    setWorks(prevWorks => prevWorks.map(w => (w.id === updatedWork.id ? updatedWork : w)));
    alert('作品を更新しました！');
  };

  const deleteWork = (workId: number) => {
    setWorks(prevWorks => prevWorks.filter(w => w.id !== workId));
    // 関連するユーザーのworks配列からも削除する必要があるが、mockDataなので簡易的に
    // 実際のバックエンドがあれば、そこでリレーション整合性が保たれるはず
    alert('作品を削除しました！');
  };

  // 通報機能（ダミー）
  const handleReportComment = (workId: number, comment: Comment) => {
    // 既に通報済みかチェック（ダミーなので簡易的）
    // 本来はバックエンドに送信
    const newReport: Report = {
      id: `r-${Date.now()}`,
      workId,
      commentId: comment.id,
      commentText: comment.text,
      reporterId: profile.id,
      status: 'unread',
      date: new Date().toLocaleDateString('ja-JP')
    };
    setReports(prev => [newReport, ...prev]);
    alert('コメントを通報しました。ご協力ありがとうございます。');
  };

  // コメント削除機能
  const deleteComment = (workId: number, commentId: string) => {
    setWorks(prevWorks =>
      prevWorks.map(w => {
        if (w.id === workId) {
          return { ...w, comments: w.comments.filter(c => c.id !== commentId) };
        }
        return w;
      })
    );
    // 関連する通報があればResolvedにする
    setReports(prevReports =>
      prevReports.map(r =>
        r.workId === workId && r.commentId === commentId ? { ...r, status: 'resolved' } : r
      )
    );
  };

  // 通知を既読にする
  const markReportAsRead = (reportId: string) => {
    setReports(prevReports =>
      prevReports.map(r =>
        r.id === reportId && r.status === 'unread' ? { ...r, status: 'read' } : r
      )
    );
  };

  // 選択したコメント（通報）を一括削除
  const deleteSelectedComments = (reportIds: string[]) => {
    reportIds.forEach(rId => {
      const report = reports.find(r => r.id === rId);
      if (report) {
        deleteComment(report.workId, report.commentId);
      }
    });
    alert('選択したコメントを削除しました。');
  };

  const value = {
    works,
    users,
    reports,
    getWorkById,
    getWorksByAuthorId,
    getCreatorById,
    toggleLike,
    addComment,
    toggleFollow,
    searchWorks,
    updateWork,
    deleteWork,
    handleReportComment,
    deleteComment,
    markReportAsRead,
    deleteSelectedComments
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};