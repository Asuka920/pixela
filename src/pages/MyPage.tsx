// src/pages/MyPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import WorkGrid from '../components/WorkGrid';
import { SnsLinks, Creator } from '../types';//'type'

type MyPageTab = 'uploaded' | 'liked' | 'following' | 'followers' | 'profile-edit' | 'account-management';

const AVAILABLE_SKILLS = [
  'Procreate',
  'デジタルイラスト',
  '色彩設計',
  'Adobe Animate',
  'Photoshop',
  'アニメーション',
  'Scratch',
  'ゲームデザイン',
  'プログラミング',
  'HTML',
  'CSS',
  'JavaScript',
  'Webデザイン',
  '写真撮影',
  'InDesign',
  'ZINE制作',
  'CLIP STUDIO PAINT',
  'キャラクターデザイン',
  'Blender',
  '3Dモデリング',
  '動画編集',
  'Premiere Pro',
  'After Effects',
  'Unity'
];

const MyPage: React.FC = () => {
  const { profile, updateProfile, isLoggedIn } = useAuth();
  const { works, users } = useData();
  const [activeTab, setActiveTab] = useState<MyPageTab>('uploaded');

  // プロフィール編集フォーム用のローカルステート
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [sns, setSns] = useState<SnsLinks>(profile.sns);
  const [skills, setSkills] = useState<string[]>(profile.skills || []);

  // アカウント管理用のローカルステート
  const [email, setEmail] = useState('user@example.com'); // ダミー初期値
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // AuthContextのprofileが変更されたらフォームに反映
  useEffect(() => {
    setName(profile.name);
    setBio(profile.bio);
    setSns(profile.sns);
    setSkills(profile.skills || []);
  }, [profile]);

  // script.js updateMyProfile
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(name, bio, sns, skills);
  };

  const handleSkillChange = (skill: string) => {
    setSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSns(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`メールアドレスを ${email} に変更しました。（ダミー処理）`);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('新しいパスワードが一致しません。');
      return;
    }
    alert('パスワードを変更しました。（ダミー処理）');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // script.js renderMyPage
  const renderedContent = useMemo(() => {
    switch (activeTab) {
      case 'uploaded':
        const uploadedWorks = works.filter(w => w.uploaded);
        return <WorkGrid works={uploadedWorks} emptyMessage="まだアップロードした作品はありません。" />;
      case 'liked':
        const likedWorks = works.filter(w => w.liked);
        return <WorkGrid works={likedWorks} emptyMessage="まだいいねした作品はありません。" />;
      case 'following':
        const followingUsers = users.filter(u => u.following);
        return <UserList users={followingUsers} actionLabel="フォロー解除" />;
      case 'followers':
        const followersUsers = users.filter(u => u.follower);
        return <UserList users={followersUsers} actionLabel="ブロック" />;
      case 'profile-edit':
        return (
          <form id="profile-edit-form" onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label htmlFor="user-name">ユーザー名</label>
              <input
                type="text"
                id="user-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">自己紹介</label>
              <textarea
                id="bio"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="profile-image">プロフィール画像</label>
              <input type="file" id="profile-image" accept="image/*" />
            </div>
            <div className="form-group sns-links-group">
              <label>SNSリンク</label>
              <div className="sns-input-wrapper">
                <i className="fab fa-twitter"></i>
                <input type="url" name="twitter" placeholder="https://twitter.com/username" value={sns.twitter} onChange={handleSnsChange} />
              </div>
              <div className="sns-input-wrapper">
                <i className="fab fa-instagram"></i>
                <input type="url" name="instagram" placeholder="https://instagram.com/username" value={sns.instagram} onChange={handleSnsChange} />
              </div>
              <div className="sns-input-wrapper">
                <i className="fab fa-facebook"></i>
                <input type="url" name="facebook" placeholder="https://facebook.com/username" value={sns.facebook} onChange={handleSnsChange} />
              </div>
            </div>

            <div className="form-group skills-group">
              <label>スキル</label>
              <div className="skills-checkbox-container">
                {AVAILABLE_SKILLS.map(skill => (
                  <label key={skill} className="skill-checkbox-label">
                    <input
                      type="checkbox"
                      value={skill}
                      checked={skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>
            <button type="submit">プロフィールを更新</button>
          </form>
        );
      case 'account-management':
        return (
          <div className="account-management">
            <h3>メールアドレス変更</h3>
            <form onSubmit={handleEmailSubmit} className="account-form">
              <div className="form-group">
                <label htmlFor="email">メールアドレス</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit">メールアドレスを変更</button>
            </form>

            <hr className="divider" />

            <h3>パスワード変更</h3>
            <form onSubmit={handlePasswordSubmit} className="account-form">
              <div className="form-group">
                <label htmlFor="current-password">現在のパスワード</label>
                <input
                  type="password"
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="new-password">新しいパスワード</label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">新しいパスワード（確認）</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">パスワードを変更</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  }, [activeTab, works, users, name, bio, sns, skills, updateProfile, email, currentPassword, newPassword, confirmPassword]);

  // ログインしていない場合はマイページを表示しない（またはログインを促す）
  if (!isLoggedIn) {
    return (
      <section id="mypage" className="page-section active-page mypage-section">
        <p>マイページを表示するにはログインが必要です。</p>
      </section>
    );
  }

  return (
    <section id="mypage" className="page-section active-page mypage-section">
      <div className="mypage-header"> {/* */}
        <img
          src={profile.profileIconUrl}
          alt="プロフィール画像"
          id="mypage-profile-icon"
          className="mypage-profile-icon"
        />
        <h2 id="mypage-title">{profile.name}のマイページ</h2>
      </div>

      <div className="mypage-tabs"> {/* */}
        {(['uploaded', 'liked', 'following', 'followers', 'profile-edit', 'account-management'] as MyPageTab[]).map(tab => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            data-tab={tab}
            onClick={() => setActiveTab(tab)}
          >
            {/* 簡易的なタブ名 */}
            {tab === 'uploaded' && 'アップロード作品'}
            {tab === 'liked' && 'いいねした作品'}
            {tab === 'following' && 'フォロー'}
            {tab === 'followers' && 'フォロワー'}
            {tab === 'profile-edit' && 'プロフィール編集'}
            {tab === 'account-management' && 'アカウント管理'}
          </button>
        ))}
      </div>

      {/* script.jsのタブコンテンツ表示ロジック */}
      <div className="tab-content active" id={`${activeTab}-content`}>
        {renderedContent}
      </div>
    </section>
  );
};

// ユーザーリストのコンポーネント (renderUserList に相当)
const UserList: React.FC<{ users: Creator[], actionLabel: string }> = ({ users, actionLabel }) => {
  const handleAction = (userId: string) => {
    alert(`ユーザー ${userId} に対してアクションを実行しました。（ダミー処理）`); //
  };

  if (users.length === 0) {
    return <p>該当するユーザーはいません。</p>;
  }

  return (
    <div className="user-list">
      {users.map(user => (
        <div className="user-card" key={user.id}>
          <i className="fas fa-user-circle user-avatar"></i>
          <div className="user-info">
            <h4>{user.name}</h4>
            <p>ID: {user.id}</p>
          </div>
          <button className="action-button" onClick={() => handleAction(user.id)}>
            {actionLabel}
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyPage;