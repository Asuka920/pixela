// src/types.ts

export interface Comment {
  id: string; // unique id
  userId?: string; // ID of the user who commented (optional for guest)
  userName: string;
  text: string;
  date: string;
}

export interface Work {
  id: number;
  title: string;
  author: string;
  authorId: string;

  // 制作区分 (Works / 個人制作)
  workType?: 'Works' | '個人制作';

  // コンテンツの種類
  type: 'image' | 'video' | 'product' | 'zine' | 'other';

  // タイプ別のURL
  imageUrls: string[];
  videoUrl?: string; // YouTube/Vimeo URL
  productUrl?: string; // Webサイト/プロダクトのURL
  otherUrl?: string; // その他のURL
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
  jobStatus?: 'accepting' | 'discussion' | 'closed'; // お仕事依頼ステータス
}

// 他のクリエイターのプロフィール（フォロー状態などを含む）
export interface Creator extends UserProfile {
  following: boolean;
  follower: boolean;
  works: number[]; // 作品IDの配列
}

export interface Report {
  id: string;
  workId: number;
  commentId: string;
  commentText: string;
  reporterId?: string; // 任意
  status: 'unread' | 'read' | 'resolved';
  date: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  message: string;
  status: 'unread' | 'read' | 'resolved';
  date: string;
}

export interface Tenant {
  id: string;
  name: string;
  description: string; // 簡易紹介
  detailDescription: string; // 詳細紹介（タブ内）
  iconUrl: string;
  memberIds: string[]; // 所属メンバーID
  pickupWorkIds: number[]; // ピックアップ作品ID
}

// 下書き保存用の型
export interface DraftWork {
  draftId: string;      // 下書き固有ID
  savedAt: string;      // 保存日時 (ISO 8601)
  authorId: string;     // 下書き所有者のユーザーID

  // 既存作品の編集下書きの場合は workId を持つ
  workId?: number;

  // Work の全フィールドをオプショナルに
  title?: string;
  description?: string;
  type?: 'image' | 'video' | 'product' | 'zine' | 'other';
  workType?: 'Works' | '個人制作';
  imageUrls?: string[];
  videoUrl?: string;
  productUrl?: string;
  otherUrl?: string;
  pdfUrl?: string;
  tags?: string[];
  createdDate?: string;
  tools?: string[];
  duration?: string;
}