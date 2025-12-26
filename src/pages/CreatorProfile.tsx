// src/pages/CreatorProfile.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import WorkGrid from '../components/WorkGrid';

const CreatorProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { getCreatorById, getWorksByAuthorId, toggleFollow } = useData();
  const { isLoggedIn } = useAuth();

  const user = getCreatorById(userId || '');
  const userWorks = getWorksByAuthorId(userId || '');

  if (!user) {
    return (
      <section id="creator-profile" className="page-section active-page">
        <h2>メンバーが見つかりませんでした。</h2>
      </section>
    );
  }

  // script.js initFollowButton
  const handleFollowClick = () => {
    if (!isLoggedIn) {
      alert('フォローするにはログインが必要です。');
      return;
    }
    toggleFollow(user.id);
  };

  const snsLinks = [
    { key: 'twitter', icon: 'fab fa-twitter', url: user.sns.twitter },
    { key: 'instagram', icon: 'fab fa-instagram', url: user.sns.instagram },
    { key: 'facebook', icon: 'fab fa-facebook', url: user.sns.facebook },
  ];

  // 作品統計
  const totalLikes = userWorks.reduce((sum, work) => sum + work.likes, 0);

  return (
    <section id="creator-profile" className="page-section active-page creator-profile-section">
      <div id="creator-profile-content">
        <div className="creator-profile-header">
          <img src={user.profileIconUrl} alt={user.name} className="creator-profile-icon" />
          <div className="creator-profile-info">
            <h2>{user.name}</h2>
            <p>{user.bio}</p>

            {/* メンバー情報 */}
            <div className="member-info">
              {user.joinDate && (
                <div className="member-info-item">
                  <i className="fas fa-calendar-alt"></i>
                  <span>入所日: {user.joinDate}</span>
                </div>
              )}
              {user.graduationDate && (
                <div className="member-info-item">
                  <i className="fas fa-graduation-cap"></i>
                  <span>卒業日: {user.graduationDate}</span>
                </div>
              )}
              {user.employmentInfo && (
                <div className="member-info-item">
                  <i className="fas fa-briefcase"></i>
                  <span>就職先: {user.employmentInfo}</span>
                </div>
              )}
            </div>

            {/* スキル */}
            {user.skills && user.skills.length > 0 && (
              <div className="member-skills">
                <strong><i className="fas fa-tools"></i> スキル:</strong>
                <div className="skills-tags">
                  {user.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {/* 受賞歴 */}
            {user.awards && user.awards.length > 0 && (
              <div className="member-awards">
                <strong><i className="fas fa-trophy"></i> 受賞歴:</strong>
                <ul>
                  {user.awards.map((award, index) => (
                    <li key={index}>{award}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 作品統計 */}
            <div className="work-stats">
              <div className="stat-item">
                <i className="fas fa-image"></i>
                <span className="stat-number">{userWorks.length}</span>
                <span className="stat-label">作品数</span>
              </div>
              <div className="stat-item">
                <i className="fas fa-heart"></i>
                <span className="stat-number">{totalLikes}</span>
                <span className="stat-label">総いいね数</span>
              </div>
            </div>

            <div className="creator-sns-links">
              {snsLinks.map(link => link.url && (
                <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.key}>
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
            {isLoggedIn && (
              <button
                className={`follow-button ${user.following ? 'following' : ''}`}
                onClick={handleFollowClick}
              >
                {user.following ? 'フォロー中' : 'フォロー'}
              </button>
            )}
          </div>
        </div>
        <h3>作品一覧</h3>
        <WorkGrid works={userWorks} emptyMessage="まだ作品がありません。" />
      </div>
    </section>
  );
};

export default CreatorProfile;