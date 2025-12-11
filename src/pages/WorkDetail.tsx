// src/pages/WorkDetail.tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import VideoPlayer from '../components/VideoPlayer';
import GameEmbed from '../components/GameEmbed';
import ZineViewer from '../components/ZineViewer';

const WorkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getWorkById, toggleLike, addComment } = useData();
  const { isLoggedIn } = useAuth();
  const [commentText, setCommentText] = useState('');

  // URLパラメータは文字列なので数値に変換
  const work = getWorkById(Number(id));

  if (!work) {
    return (
      <section id="work-detail" className="page-section active-page">
        <div id="work-detail-content">
          <h2>作品が見つかりませんでした。</h2>
        </div>
      </section>
    );
  }

  // script.js handleCommentPost
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      // addComment(work.id, commentText); // リアルタイム反映を無効化
      alert('コメントを送信しました');
      setCommentText('');
    }
  };

  // script.js initLikeButtons
  const handleLikeClick = () => {
    toggleLike(work.id);
  };

  // 作品タイプ別のコンテンツレンダリング
  const renderWorkContent = () => {
    switch (work.type) {
      case 'image':
        return (
          <div id="work-detail-image-container">
            {work.imageUrls.map((url, index) => (
              <img src={url} alt={`${work.title} ${index + 1}`} key={index} />
            ))}
          </div>
        );

      case 'video':
        return work.videoUrl ? (
          <VideoPlayer videoUrl={work.videoUrl} title={work.title} />
        ) : (
          <p>動画URLが設定されていません。</p>
        );

      case 'game':
        return work.gameUrl ? (
          <GameEmbed gameUrl={work.gameUrl} title={work.title} />
        ) : (
          <p>ゲームURLが設定されていません。</p>
        );

      case 'website':
        return (
          <div className="website-preview">
            {work.imageUrls.length > 0 && (
              <img
                src={work.imageUrls[0]}
                alt={`${work.title}のスクリーンショット`}
                className="website-screenshot"
              />
            )}
            {work.websiteUrl && (
              <div className="website-link-container">
                <a
                  href={work.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="website-link"
                >
                  <i className="fas fa-external-link-alt"></i> Webサイトを見る
                </a>
              </div>
            )}
          </div>
        );

      case 'zine':
        return (
          <ZineViewer
            imageUrls={work.imageUrls}
            pdfUrl={work.pdfUrl}
            title={work.title}
          />
        );

      default:
        return (
          <div id="work-detail-image-container">
            {work.imageUrls.map((url, index) => (
              <img src={url} alt={`${work.title} ${index + 1}`} key={index} />
            ))}
          </div>
        );
    }
  };

  return (
    <section id="work-detail" className="page-section active-page work-detail-section">
      <div id="work-detail-content">
        <div id="work-detail-header">
          <h2>{work.title}</h2>
          <div className="work-type-badge">
            {work.type === 'image' && <><i className="fas fa-image"></i> 画像</>}
            {work.type === 'video' && <><i className="fas fa-video"></i> 動画</>}
            {work.type === 'game' && <><i className="fas fa-gamepad"></i> ゲーム</>}
            {work.type === 'website' && <><i className="fas fa-globe"></i> Webサイト</>}
            {work.type === 'zine' && <><i className="fas fa-book"></i> Zine</>}
          </div>
          <div className="creator-info">
            <Link to={`/profile/${work.authorId}`}>
              <i className="fas fa-user-circle"></i> {work.author}
            </Link>
          </div>
          <div className="tags">
            {work.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
        </div>

        {renderWorkContent()}

        <div id="work-detail-actions">
          <button className="like-button" onClick={handleLikeClick}>
            <i className={`${work.liked ? 'fas' : 'far'} fa-heart`}></i>
            <span>{work.likes}</span>
          </button>
        </div>

        <div id="work-detail-info">
          <h3>作品説明</h3>
          <p>{work.description}</p>

          {/* 制作情報 */}
          {(work.createdDate || work.tools || work.duration || work.awards) && (
            <div className="work-production-info">
              <h3>制作情報</h3>
              {work.createdDate && (
                <div className="info-item">
                  <strong><i className="fas fa-calendar"></i> 制作日:</strong> {work.createdDate}
                </div>
              )}
              {work.uploadedDate && (
                <div className="info-item">
                  <strong><i className="fas fa-cloud-upload-alt"></i> アップロード日:</strong> {work.uploadedDate}
                </div>
              )}
              {work.tools && work.tools.length > 0 && (
                <div className="info-item">
                  <strong><i className="fas fa-tools"></i> 使用ツール:</strong> {work.tools.join(', ')}
                </div>
              )}
              {work.duration && (
                <div className="info-item">
                  <strong><i className="fas fa-clock"></i> 制作期間:</strong> {work.duration}
                </div>
              )}
              {work.awards && work.awards.length > 0 && (
                <div className="info-item awards">
                  <strong><i className="fas fa-trophy"></i> 受賞歴:</strong>
                  <ul>
                    {work.awards.map((award, index) => (
                      <li key={index}>{award}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="comment-section">
          <h3>コメント</h3>
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={isLoggedIn ? 'コメントを入力...' : 'ログインするとコメントできます'}
              disabled={!isLoggedIn}
            ></textarea>
            <button type="submit" disabled={!isLoggedIn || !commentText.trim()}>
              コメントを送る
            </button>
          </form>
          <ul className="comment-list">
            {work.comments.length === 0 ? (
              <p>まだコメントはありません。</p>
            ) : (
              work.comments.map((c, index) => (
                <li className="comment-item" key={index}>
                  <div className="comment-meta">
                    <strong>{c.userName}</strong>
                    <span>{c.date}</span>
                  </div>
                  <p className="comment-text">{c.text}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WorkDetail;