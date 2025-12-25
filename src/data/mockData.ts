// src/data/mockData.ts
import { UserProfile, Work, Creator } from '../types';//'type'

export const initialMyProfile: UserProfile = {
  id: 'my-user',
  name: 'ログインユーザー',
  bio: 'Pixelaへようこそ！',
  // 元の 'Public/S__20742150-1024x1024.jpg'
  profileIconUrl: '/images/S__20742150-1024x1024.jpg',
  sns: { twitter: '', instagram: '', facebook: '' },
  jobStatus: 'accepting'
};

export const initialWorks: Work[] = [
  // 画像作品
  {
    id: 1,
    title: '青の幻想',
    author: '田中 太郎',
    authorId: 'user-a',
    type: 'image',
    imageUrls: ['/images/painting-blue-purple-abstract-painting_902639-6019.jpg', '/images/1000_F_463810767_gv90HVFDRi3JwmkEYSnHfDMHoMzdcUSt.jpg'],
    tags: ['イラスト', 'デジタルアート'],
    likes: 120,
    uploaded: true,
    liked: true,
    description: '青を基調とした鮮やかなデジタルアート作品。Procreateを使用して制作しました。',
    comments: [
      { id: 'c1', userId: 'user-d', userName: '佐藤 花子', text: '素晴らしい色彩ですね！感動しました！', date: '2025/10/01' },
      { id: 'c2', userId: 'user-b', userName: '鈴木 次郎', text: '青の使い方がとても綺麗です。', date: '2025/10/03' }, // Dummy
      { id: 'c3', userId: 'user-c', userName: '山田 三郎', text: '参考にさせていただきます！', date: '2025/10/05' }  // Dummy
    ],
    createdDate: '2025/09/15',
    uploadedDate: '2025/09/20',
    tools: ['Procreate', 'iPad Pro'],
    duration: '約2週間',
    awards: []
  },

  // 動画作品
  {
    id: 2,
    title: 'アニメーション作品「夢の世界」',
    author: '鈴木 次郎',
    authorId: 'user-b',
    type: 'video',
    imageUrls: ['/images/painting-black-grey-abstract-painting-with-gold-silver-foils_902639-6106.jpg'],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // サンプルURL
    tags: ['アニメーション', '動画'],
    likes: 85,
    uploaded: false,
    liked: true,
    description: '手描きアニメーションで制作した短編作品です。夢の中の不思議な世界を表現しました。',
    comments: [
      { id: 'c4', userId: 'user-a', userName: '田中 太郎', text: '動きが滑らかで素敵です！', date: '2025/08/26' } // Dummy
    ],
    createdDate: '2025/08/20',
    uploadedDate: '2025/08/25',
    tools: ['Adobe Animate', 'Photoshop'],
    duration: '約1ヶ月',
    awards: ['地域アート展 優秀賞']
  },

  // ゲーム作品
  // その他作品（元ゲーム）
  {
    id: 3,
    title: 'パズルゲーム「光の結晶」',
    author: '山田 三郎',
    authorId: 'user-c',
    type: 'other',
    imageUrls: ['/images/S__20742150-1024x1024.jpg'],
    otherUrl: 'https://example.com/game/crystal-puzzle', // サンプルURL
    tags: ['ゲーム', 'パズル'],
    likes: 250,
    uploaded: true,
    liked: false,
    description: 'Scratchで制作したパズルゲームです。光の結晶を集めてステージをクリアしよう！',
    comments: [
      { id: 'c5', userId: 'user-a', userName: '田中 太郎', text: '楽しいゲームですね！', date: '2025/10/02' },
      { id: 'c6', userId: 'user-d', userName: '佐藤 花子', text: 'クリアできません😭 難しくて面白い！', date: '2025/10/04' } // Dummy
    ],
    createdDate: '2025/07/10',
    uploadedDate: '2025/07/15',
    tools: ['Scratch'],
    duration: '約3週間',
    awards: []
  },

  // プロダクト作品（元Webサイト）
  {
    id: 4,
    title: 'ポートフォリオサイト',
    author: '佐藤 花子',
    authorId: 'user-d',
    type: 'product',
    imageUrls: ['/images/istockphoto-1289906195-612x612.jpg'],
    productUrl: 'https://example.com/portfolio', // サンプルURL
    tags: ['Webデザイン', 'HTML/CSS'],
    likes: 98,
    uploaded: false,
    liked: true,
    description: '自分のポートフォリオサイトを制作しました。レスポンシブデザインに対応しています。',
    comments: [],
    createdDate: '2025/09/01',
    uploadedDate: '2025/09/05',
    tools: ['HTML', 'CSS', 'JavaScript'],
    duration: '約2週間',
    awards: []
  },

  // Zine作品
  {
    id: 5,
    title: 'フォトZINE「街の風景」',
    author: '高橋 五郎',
    authorId: 'user-e',
    type: 'zine',
    imageUrls: ['/images/360_F_460484502_Fqt7IfGwQlMihj2OmDD9SfeSIEusid03.jpg', '/images/topfancy-last-names-956x1030.png'],
    pdfUrl: '/pdfs/street-zine.pdf', // サンプルURL
    tags: ['写真', 'ZINE'],
    likes: 150,
    uploaded: true,
    liked: false,
    description: '街の風景を撮影した写真をまとめたZINEです。日常の中に潜む美しさを切り取りました。',
    comments: [
      { id: 'c7', userId: 'user-f', userName: '伊藤 六子', text: '写真の雰囲気がとても好きです。', date: '2025/06/21' } // Dummy
    ],
    createdDate: '2025/06/15',
    uploadedDate: '2025/06/20',
    tools: ['カメラ', 'Photoshop', 'InDesign'],
    duration: '約1ヶ月',
    awards: []
  },

  // 画像作品
  {
    id: 6,
    title: '夕焼けの散歩道',
    author: '伊藤 六子',
    authorId: 'user-f',
    type: 'image',
    imageUrls: ['/images/topfancy-last-names-956x1030.png'],
    tags: ['写真', '風景'],
    likes: 30,
    uploaded: false,
    liked: false,
    description: '近所の公園で見つけた美しい夕焼け空です。',
    comments: [],
    createdDate: '2025/10/05',
    uploadedDate: '2025/10/06',
    tools: ['スマートフォンカメラ'],
    duration: '1日',
    awards: []
  },

  // 画像作品
  {
    id: 7,
    title: 'サイバーパンクの夜',
    author: '渡辺 七美',
    authorId: 'user-g',
    type: 'image',
    imageUrls: ['/images/1000_F_463810767_gv90HVFDRi3JwmkEYSnHfDMHoMzdcUSt.jpg'],
    tags: ['イラスト', 'SF'],
    likes: 320,
    uploaded: false,
    liked: true,
    description: '雨に濡れた街の光が美しい一枚。CLIP STUDIO PAINTで描きました。',
    comments: [],
    createdDate: '2025/08/10',
    uploadedDate: '2025/08/12',
    tools: ['CLIP STUDIO PAINT'],
    duration: '約10日',
    awards: ['デジタルアート展 入選']
  },
  // Dummy Works for User A
  {
    id: 8,
    title: '赤の情熱',
    author: '田中 太郎',
    authorId: 'user-a',
    type: 'image',
    imageUrls: ['/images/painting-blue-purple-abstract-painting_902639-6019.jpg'],
    tags: ['イラスト', '抽象画'],
    likes: 95,
    uploaded: true,
    liked: false,
    description: '赤をテーマにした情熱的な作品です。',
    comments: [],
    createdDate: '2025/09/25',
    uploadedDate: '2025/09/26',
    tools: ['Procreate'],
    duration: '1週間',
    awards: []
  },
  {
    id: 9,
    title: '緑の静寂',
    author: '田中 太郎',
    authorId: 'user-a',
    type: 'image',
    imageUrls: ['/images/1000_F_463810767_gv90HVFDRi3JwmkEYSnHfDMHoMzdcUSt.jpg'],
    tags: ['イラスト', '風景'],
    likes: 110,
    uploaded: true,
    liked: true,
    description: '森の静けさを表現しました。',
    comments: [],
    createdDate: '2025/10/05',
    uploadedDate: '2025/10/06',
    tools: ['Procreate'],
    duration: '3日',
    awards: []
  },
  // Dummy Works for User B
  {
    id: 10,
    title: '短編アニメ「朝」',
    author: '鈴木 次郎',
    authorId: 'user-b',
    type: 'video',
    imageUrls: ['/images/painting-black-grey-abstract-painting-with-gold-silver-foils_902639-6106.jpg'],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tags: ['アニメーション'],
    likes: 70,
    uploaded: true,
    liked: false,
    description: '朝の風景を描いた短いアニメーションです。',
    comments: [],
    createdDate: '2025/09/10',
    uploadedDate: '2025/09/12',
    tools: ['Adobe Animate'],
    duration: '2週間',
    awards: []
  },
  // Dummy Works for User G
  {
    id: 11,
    title: 'キャラクターデザイン案',
    author: '渡辺 七美',
    authorId: 'user-g',
    type: 'image',
    imageUrls: ['/images/1000_F_463810767_gv90HVFDRi3JwmkEYSnHfDMHoMzdcUSt.jpg'],
    tags: ['イラスト', 'キャラクター'],
    likes: 200,
    uploaded: true,
    liked: true,
    description: '新作ゲームのキャラクターデザイン案です。',
    comments: [],
    createdDate: '2025/08/25',
    uploadedDate: '2025/08/26',
    tools: ['CLIP STUDIO PAINT'],
    duration: '5日',
    awards: []
  }
];

export const initialUsers: Creator[] = [
  {
    id: 'user-a',
    name: '田中 太郎',
    bio: 'デジタルアートが得意です。色彩表現にこだわっています。',
    profileIconUrl: '/images/painting-blue-purple-abstract-painting_902639-6019.jpg',
    sns: { twitter: 'https://twitter.com/tanaka' },
    following: true,
    follower: false,
    works: [1, 8, 9],
    skills: ['Procreate', 'デジタルイラスト', '色彩設計'],
    joinDate: '2024/04/01',
    jobStatus: 'accepting'
  },
  {
    id: 'user-b',
    name: '鈴木 次郎',
    bio: 'アニメーション制作に挑戦中です。',
    profileIconUrl: '/images/painting-black-grey-abstract-painting-with-gold-silver-foils_902639-6106.jpg',
    sns: { instagram: 'https://instagram.com/suzuki' },
    following: true,
    follower: true,
    works: [2, 10],
    skills: ['Adobe Animate', 'Photoshop', 'アニメーション'],
    joinDate: '2024/05/15',
    awards: ['地域アート展 優秀賞'],
    jobStatus: 'discussion'
  },
  {
    id: 'user-c',
    name: '山田 三郎',
    bio: 'ゲーム制作が大好きです。Scratchで色々作っています。',
    profileIconUrl: '/images/S__20742150-1024x1024.jpg',
    sns: {},
    following: false,
    follower: true,
    works: [3],
    skills: ['Scratch', 'ゲームデザイン', 'プログラミング'],
    joinDate: '2024/03/10',
    jobStatus: 'closed'
  },
  {
    id: 'user-d',
    name: '佐藤 花子',
    bio: 'Webデザインを勉強しています。将来はWeb制作の仕事がしたいです。',
    profileIconUrl: '/images/istockphoto-1289906195-612x612.jpg',
    sns: {},
    following: false,
    follower: false,
    works: [4],
    skills: ['HTML', 'CSS', 'JavaScript', 'Webデザイン'],
    joinDate: '2024/06/01',
    jobStatus: 'accepting'
  },
  {
    id: 'user-e',
    name: '高橋 五郎',
    bio: '写真とZINE制作が趣味です。',
    profileIconUrl: '/images/360_F_460484502_Fqt7IfGwQlMihj2OmDD9SfeSIEusid03.jpg',
    sns: {},
    following: false,
    follower: false,
    works: [5],
    skills: ['写真撮影', 'Photoshop', 'InDesign', 'ZINE制作'],
    joinDate: '2024/02/20',
    jobStatus: 'discussion'
  },
  {
    id: 'user-f',
    name: '伊藤 六子',
    bio: '風景写真を撮るのが好きです。',
    profileIconUrl: '/images/topfancy-last-names-956x1030.png',
    sns: {},
    following: false,
    follower: false,
    works: [6],
    skills: ['写真撮影'],
    joinDate: '2024/09/01',
    jobStatus: 'accepting'
  },
  {
    id: 'user-g',
    name: '渡辺 七美',
    bio: 'イラストレーターを目指しています。',
    profileIconUrl: '/images/1000_F_463810767_gv90HVFDRi3JwmkEYSnHfDMHoMzdcUSt.jpg',
    sns: {},
    following: false,
    follower: false,
    works: [7, 11],
    skills: ['CLIP STUDIO PAINT', 'イラスト', 'キャラクターデザイン'],
    joinDate: '2024/07/10',
    awards: ['デジタルアート展 入選'],
  }
];

export const initialReports: import('../types').Report[] = [
  {
    id: 'r1',
    workId: 1,
    commentId: 'c1',
    commentText: '素晴らしい色彩ですね！感動しました！',
    reporterId: 'user-b',
    status: 'unread',
    date: '2025/10/02'
  },
  {
    id: 'r2',
    workId: 3,
    commentId: 'c5',
    commentText: '楽しいゲームですね！',
    status: 'read',
    date: '2025/10/03'
  },
  {
    id: 'r3',
    workId: 1,
    commentId: 'c3',
    commentText: '参考にさせていただきます！',
    status: 'resolved',
    date: '2025/10/01'
  }
];

export const initialInquiries: import('../types').Inquiry[] = [
  {
    id: 'i1',
    name: '山田 太郎',
    email: 'yamada@example.com',
    phone: '090-1234-5678',
    category: 'job',
    message: 'イラスト制作の依頼についてご相談したいです。予算は5万円程度を考えています。',
    status: 'unread',
    date: '2025/10/05'
  },
  {
    id: 'i2',
    name: '鈴木 花子',
    email: 'suzuki@example.com',
    category: 'other',
    message: 'Pixelaの使い方がわかりません。作品のアップロード方法を教えてください。',
    status: 'read',
    date: '2025/10/04'
  },
  {
    id: 'i3',
    name: '田中 次郎',
    email: 'tanaka@example.com',
    phone: '080-9876-5432',
    category: 'job',
    message: '動画制作の件で先日ご連絡しました田中です。返信をお待ちしております。',
    status: 'resolved',
    date: '2025/10/01'
  }
];

export const initialTenants: import('../types').Tenant[] = [
  {
    id: 't1',
    name: 'ノマドLaB',
    description: 'ノマドLaBのテナントです',
    detailDescription: 'ここはノマドLaBの詳細な紹介文です。クリエイティブな活動を通じて、メンバーのスキルアップと就労支援を行っています。多様な才能が集まる場所、それがノマドLaBです。',
    iconUrl: '/images/topfancy-last-names-956x1030.png', // 適当な画像
    memberIds: ['user-a', 'user-b', 'user-c', 'user-g'], // 適当に選出
    pickupWorkIds: [1, 2, 7] // 適当に選出
  },
  {
    id: 't2',
    name: '第2制作チーム',
    description: '第2制作チームのテナントです。',
    detailDescription: '第2制作チームは、主にWeb制作とデザインに特化したチームです。',
    iconUrl: '/images/istockphoto-1289906195-612x612.jpg',
    memberIds: ['user-d'],
    pickupWorkIds: [4]
  }
];