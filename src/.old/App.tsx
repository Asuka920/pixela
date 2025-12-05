import React, { useState, useEffect } from 'react';

// スタイルをコンポーネント内に直接定義
const GlobalStyles = () => {
    const css = `
    /* CSSリセットと共通スタイル */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Roboto', sans-serif;
        background-color: #f0f2f5;
        color: #333;
        line-height: 1.6;
        scroll-behavior: smooth;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    img {
        max-width: 100%;
        height: auto;
        display: block;
    }

    .main-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    .page-section {
        padding-top: 5rem; /* ヘッダーの高さ分 */
    }

    /* ヘッダー */
    .header {
        width: 100%;
        background: linear-gradient(135deg, #b5d2e7, #9dbdba);
        color: #fff;
        padding: 1rem 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
    }

    .header-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .site-logo {
        font-size: 1.5rem;
        font-weight: bold;
        letter-spacing: 2px;
    }

    /* ナビゲーションメニュー */
    .nav-menu ul {
        list-style: none;
        display: flex;
        gap: 1.5rem;
    }

    .nav-menu a {
        transition: color 0.3s;
        font-weight: 500;
    }

    .nav-menu a:hover {
        color: #f0f0f0;
    }

    /* ユーザー認証リンク */
    .user-auth-links {
        display: flex;
        gap: 1rem;
    }

    .user-auth-links a {
        background-color: #fff;
        color: #9dbdba;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-weight: bold;
        transition: background-color 0.3s, color 0.3s;
    }

    .user-auth-links a:hover {
        background-color: #f0f0f0;
    }

    /* ハンバーガーメニュー (モバイル用) */
    .hamburger-menu {
        display: none;
        cursor: pointer;
        flex-direction: column;
        gap: 5px;
    }

    .hamburger-menu span {
        display: block;
        width: 25px;
        height: 3px;
        background-color: #fff;
        transition: 0.3s;
    }

    /* スライドショーコンポーネントの共通スタイル */
    .popular-works-slideshow {
        margin-bottom: 4rem;
    }

    .popular-works-slideshow h2 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
        text-align: center;
        color: #444;
    }

    .slideshow-container {
        overflow: hidden;
        position: relative;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .slideshow-wrapper {
        display: flex;
        transition: transform 0.8s ease-in-out; /* スライドのアニメーション */
        width: 100%;
    }

    .slide {
        min-width: 100%; /* 各スライドがコンテナの幅を占める */
        height: 400px; /* スライドショーの高さ */
        position: relative;
        cursor: pointer;
    }

    .slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .slide-info {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        color: #fff;
        padding: 1rem;
    }

    .slide-info h3 {
        margin-top: 0;
    }

    /* 作品フィードのスタイル */
    .works-feed {
        margin-bottom: 3rem;
    }

    .works-feed h2 {
        font-size: 1.8rem;
        border-bottom: 2px solid #ddd;
        padding-bottom: 0.5rem;
        margin-bottom: 1.5rem;
        color: #555;
    }

    .works-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
    }

    /* 「もっと見る」ボタン */
    .load-more-container {
        text-align: center;
        margin-top: 2rem;
    }

    .load-more-button {
        background-color: #9dbdba;
        color: #fff;
        padding: 10px 25px;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: bold;
        transition: background-color 0.3s, box-shadow 0.3s;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .load-more-button:hover {
        background-color: #8faeb9;
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .load-more-button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        box-shadow: none;
    }


    /* 作品カード */
    .work-card {
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .work-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    .work-card img {
        width: 100%;
        height: 200px; /* 作品画像の固定高さ */
        object-fit: cover;
    }

    .work-info {
        padding: 1rem;
    }

    .work-info h3 {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        color: #444;
    }

    .tags {
        margin-top: 0.5rem;
    }

    .tag {
        display: inline-block;
        background-color: #e0e7ee;
        color: #6a8ba4;
        font-size: 0.75rem;
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
        margin-right: 0.3rem;
        margin-bottom: 0.3rem;
    }

    .work-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem 1rem;
        border-top: 1px solid #eee;
    }

    .author-link {
        display: flex;
        align-items: center;
        color: #666;
        font-size: 0.9rem;
        transition: color 0.3s;
    }

    .author-link i {
        margin-right: 0.5rem;
        color: #9dbdba;
    }

    /* いいねボタンのスタイル */
    .like-button {
        background: none;
        border: none;
        cursor: pointer;
        color: #999;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 5px;
        transition: color 0.2s;
    }

    .like-button .fas.fa-heart {
        color: #e74c3c;
    }

    /* 作品詳細ページ */
    .work-detail-section {
        padding: 2rem;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    }
    
    #work-detail-image-container {
        margin: 2rem 0;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    #work-detail-image-container img {
        width: 100%;
        height: auto;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    /* コメントセクションのスタイル */
    .comment-section {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 2px solid #f0f2f5;
    }

    .comment-form textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        resize: vertical;
        min-height: 80px;
        margin-bottom: 0.5rem;
    }

    .comment-form button {
        background-color: #9dbdba;
        color: #fff;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        align-self: flex-start;
    }

    .comment-list {
        list-style: none;
    }

    /* クリエイタープロフィールページ */
    .creator-profile-header {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #eee;
    }

    .creator-profile-icon {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
    }

    .creator-profile-info h2 {
        font-size: 2rem;
        margin: 0 0 0.5rem;
    }

    /* フォローボタン */
    .follow-button {
        background-color: #9dbdba;
        color: #fff;
        padding: 8px 20px;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s;
        margin-top: 1rem;
    }

    .follow-button.following {
        background-color: #fff;
        color: #9dbdba;
        border: 1px solid #9dbdba;
    }
    `;
    return <style>{css}</style>;
};

// データ型の定義
interface Comment {
  userName: string;
  text: string;
  date: string;
}

interface Work {
  id: number;
  title: string;
  author: string;
  authorId: string;
  imageUrls: string[];
  tags: string[];
  likes: number;
  uploaded: boolean;
  liked: boolean;
  description: string;
  comments: Comment[];
}

interface User {
  id: string;
  name: string;
  bio: string;
  profileIconUrl: string;
  sns: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  following: boolean;
  follower: boolean;
  works: number[];
}

// ===== ダミーデータ =====
const initialWorks: Work[] = [
    { id: 1, title: '青の幻想', author: 'Aqua', authorId: 'user-a', imageUrls: ['/painting-blue-purple-abstract-painting_902639-6019.jpg', '/1000_F_463810767_gv90HVFDRi3JwmkEYSnHfDMHoMzdcUSt.jpg'], tags: ['イラスト', 'デジタルアート'], likes: 120, uploaded: true, liked: true, description: '青を基調とした鮮やかなデジタルアート作品。複数枚投稿のテストです。', comments: [{ userName: 'Shadow', text: '素晴らしい色彩ですね！感動しました！', date: '2025/10/01' }] },
    { id: 2, title: '都市の影', author: 'Shadow', authorId: 'user-b', imageUrls: ['/painting-black-grey-abstract-painting-with-gold-silver-foils_902639-6106.jpg'], tags: ['写真', 'モノクロ'], likes: 85, uploaded: false, liked: true, description: '夜の都市をモノクロで切り取りました。', comments: [] },
    { id: 3, title: '光の結晶', author: 'Prism', authorId: 'user-c', imageUrls: ['/S__20742150-1024x1024.jpg'], tags: ['3D', '抽象'], likes: 250, uploaded: true, liked: false, description: '複雑な幾何学模様が織りなす光の芸術です。', comments: [{ userName: 'Aqua', text: 'きれいですね', date: '2025/10/02' }] },
    { id: 4, title: '夢の航路', author: 'Voyager', authorId: 'user-a', imageUrls: ['/istockphoto-1289906195-612x612.jpg'], tags: ['イラスト', 'ファンタジー'], likes: 98, uploaded: false, liked: true, description: 'まだ見ぬ世界への旅路を描きました。', comments: [] },
    { id: 5, title: '未来都市', author: 'Neo', authorId: 'user-d', imageUrls: ['/360_F_460484502_Fqt7IfGwQlMihj2OmDD9SfeSIEusid03.jpg'], tags: ['3D', 'SF'], likes: 150, uploaded: true, liked: false, description: 'ネオン輝くサイバーパンクな世界観です。', comments: [] },
    { id: 6, title: '夕焼けの散歩道', author: 'Walker', authorId: 'user-e', imageUrls: ['/topfancy-last-names-956x1030.png'], tags: ['写真', '風景'], likes: 30, uploaded: false, liked: false, description: '近所の公園で見つけた美しい夕焼け空です。', comments: [] },
    { id: 7, title: 'サイバーパンクの夜', author: 'Glow', authorId: 'user-f', imageUrls: ['/1000_F_463810767_gv90HVFDRi3JwmkEYSnHfDMHoMzdcUSt.jpg'], tags: ['イラスト', 'SF'], likes: 320, uploaded: false, liked: true, description: '雨に濡れた街の光が美しい一枚。', comments: [] }
];

const initialUsers: User[] = [
    { id: 'user-a', name: 'Aqua', bio: '水彩画家です。', profileIconUrl: '/painting-blue-purple-abstract-painting_902639-6019.jpg', sns: { twitter: 'https://twitter.com/aqua' }, following: true, follower: false, works: [1, 4] },
    { id: 'user-b', name: 'Shadow', bio: '写真家。', profileIconUrl: '/painting-black-grey-abstract-painting-with-gold-silver-foils_902639-6106.jpg', sns: { instagram: 'https://instagram.com/shadow' }, following: true, follower: true, works: [2] },
    { id: 'user-c', name: 'Prism', bio: '3Dアーティスト。', profileIconUrl: '/S__20742150-1024x1024.jpg', sns: {}, following: false, follower: true, works: [3] },
    { id: 'user-d', name: 'Neo', bio: 'SFの世界を創ります。', profileIconUrl: '/360_F_460484502_Fqt7IfGwQlMihj2OmDD9SfeSIEusid03.jpg', sns: {}, following: false, follower: false, works: [5] },
    { id: 'user-e', name: 'Walker', bio: '風景写真家。', profileIconUrl: '/topfancy-last-names-956x1030.png', sns: {}, following: false, follower: false, works: [6] },
    { id: 'user-f', name: 'Glow', bio: 'イラストレーター。', profileIconUrl: '/1000_F_463810767_gv90HVFDRi3JwmkEYSnHfDMHoMzdcUSt.jpg', sns: {}, following: false, follower: false, works: [7] }
];

// ===== 再利用可能なコンポーネント =====
const WorkCard: React.FC<{ work: Work; onLike: (id: number) => void }> = ({ work, onLike }) => (
    <div className="work-card">
        <a href={`#work-detail-${work.id}`}>
            <img src={work.imageUrls[0]} alt={work.title} loading="lazy" />
            <div className="work-info"><h3>{work.title}</h3></div>
        </a>
        <div className="work-meta">
            <a href={`#profile-${work.authorId}`} className="author-link">
                <i className="fas fa-user-circle"></i><span>{work.author}</span>
            </a>
            <button className="like-button" onClick={() => onLike(work.id)}>
                <i className={`${work.liked ? 'fas' : 'far'} fa-heart`}></i>
                <span>{work.likes}</span>
            </button>
        </div>
    </div>
);

const WorksGrid: React.FC<{ works: Work[]; onLike: (id: number) => void }> = ({ works, onLike }) => (
    <div className="works-grid">
        {works.map(work => <WorkCard key={work.id} work={work} onLike={onLike} />)}
    </div>
);

// ===== メインアプリケーションコンポーネント =====
const App: React.FC = () => {
    // ===== ステート管理 =====
    const [works, setWorks] = useState<Work[]>(initialWorks);
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [currentHash, setCurrentHash] = useState<string>(window.location.hash);
    
    // ===== イベントハンドラ =====
    const handleLike = (id: number) => {
        setWorks(prevWorks => prevWorks.map(w => w.id === id ? { ...w, liked: !w.liked, likes: w.liked ? w.likes - 1 : w.likes + 1 } : w));
    };

    const handleFollow = (id: string) => {
        if (!isLoggedIn) {
            alert('フォローするにはログインが必要です。');
            return;
        }
        setUsers(prevUsers => prevUsers.map(u => u.id === id ? { ...u, following: !u.following } : u));
    };

    const toggleLogin = () => {
        setIsLoggedIn(prev => !prev);
        window.location.hash = '#home';
    };

    // ===== 副作用（ルーティング）=====
    useEffect(() => {
        const handleHashChange = () => setCurrentHash(window.location.hash);
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // 初期表示
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // ===== ページコンポーネントのレンダリング =====
    const RenderPage = () => {
        const hash = currentHash.replace('#', '');
        const pageParts = hash.split('-');
        const page = pageParts[0] || 'home';
        
        switch (page) {
            case 'work': {
                const workId = parseInt(pageParts[2] || '');
                const work = works.find(w => w.id === workId);
                return work ? <div>Work Detail Page for {work.title}</div> : <div>Work not found</div>;
            }
            case 'profile': {
                const userId = pageParts[1] || '';
                const user = users.find(u => u.id === userId);
                const userWorks = works.filter(w => user?.works.includes(w.id));
                 return user ? (
                    <div className="creator-profile-section">
                        <div className="creator-profile-header">
                            <img src={user.profileIconUrl} alt={user.name} className="creator-profile-icon" />
                            <div className="creator-profile-info">
                                <h2>{user.name}</h2>
                                <p>{user.bio}</p>
                                <button className={`follow-button ${user.following ? 'following' : ''}`} onClick={() => handleFollow(user.id)}>
                                    {user.following ? 'フォロー中' : 'フォロー'}
                                </button>
                            </div>
                        </div>
                        <h3>作品一覧</h3>
                        <WorksGrid works={userWorks} onLike={handleLike} />
                    </div>
                ) : <div>User not found</div>;
            }
            case 'find': {
                 return <div>Find Works Page</div>;
            }
            case 'home':
            default: {
                const personalizedWorks = isLoggedIn ? works.filter(w => w.liked) : works;
                const newWorks = [...works].sort((a, b) => b.id - a.id);
                return (
                    <div>
                        <section className="works-feed personalized-works">
                             <h2>あなたへのおすすめ</h2>
                             <WorksGrid works={personalizedWorks.slice(0,3)} onLike={handleLike} />
                             <div className="load-more-container"><button className="load-more-button">もっと見る</button></div>
                        </section>
                        <section className="works-feed new-works">
                             <h2>新着作品</h2>
                             <WorksGrid works={newWorks.slice(0,3)} onLike={handleLike} />
                             <div className="load-more-container"><button className="load-more-button">もっと見る</button></div>
                        </section>
                    </div>
                );
            }
        }
    };
    
    return (
        <>
            <GlobalStyles />
            <header className="header">
                <div className="header-inner">
                    <a href="#home" className="site-logo">Pixela</a>
                    <nav className="nav-menu">
                        <ul>
                            <li><a href="#home">ホーム</a></li>
                            <li><a href="#find-works">作品を探す</a></li>
                            {isLoggedIn && <li><a href="#upload">作品投稿</a></li>}
                            <li><a href="#about">Pixelaについて</a></li>
                            <li><a href="#contact">お問い合わせ</a></li>
                        </ul>
                    </nav>
                    <div className="user-auth-links">
                        <a href="#" onClick={toggleLogin}>{isLoggedIn ? 'ログアウト' : 'ログイン'}</a>
                        {!isLoggedIn && <a href="#signup">新規登録</a>}
                        {isLoggedIn && <a href="#mypage" id="profile-link"><i className="fas fa-user-circle"></i> プロフィール</a>}
                    </div>
                </div>
            </header>
            
            <main className="main-content">
                <RenderPage />
            </main>

            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2025 Pixela. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default App;

