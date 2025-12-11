// src/types.ts

export interface Comment {
  userName: string;
  text: string;
  date: string;
}

export interface Work {
  id: number;
  title: string;
  author: string;
  authorId: string;

  // 作品タイプ
  type: 'image' | 'video' | 'game' | 'website' | 'zine';

  // タイプ別のURL
  imageUrls: string[];
  videoUrl?: string; // YouTube/Vimeo URL
  gameUrl?: string; // ゲームのURL
  websiteUrl?: string; // WebサイトのURL
  pdfUrl?: string; // ZineのPDF URL

  tags: string[];
  likes: number;
  uploaded: boolean; // 元のscript.jsのプロパティ
  liked: boolean;    // 元のscript.jsのプロパティ
  description: string;
  comments: Comment[];

  // 制作情報
  createdDate?: string; // 制作日
  uploadedDate?: string; // アップロード日
  tools?: string[]; // 使用ツール
  duration?: string; // 制作期間
  awards?: string[]; // 受賞歴
}

export interface SnsLinks {
  twitter?: string;
  instagram?: string;
  facebook?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  bio: string;
  profileIconUrl: string;
  sns: SnsLinks;

  // メンバー情報
  skills?: string[]; // スキルセット
  joinDate?: string; // 入所日
  graduationDate?: string; // 卒業日
  employmentInfo?: string; // 就職先情報
  awards?: string[]; // 受賞歴
}

// 他のクリエイターのプロフィール（フォロー状態などを含む）
export interface Creator extends UserProfile {
  following: boolean;
  follower: boolean;
  works: number[]; // 作品IDの配列
}