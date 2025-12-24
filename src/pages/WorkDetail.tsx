// src/pages/WorkDetail.tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import VideoPlayer from '../components/VideoPlayer';
import ZineViewer from '../components/ZineViewer';

const WorkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getWorkById, toggleLike, addComment, getCreatorById, deleteComment, handleReportComment } = useData();
  const { userType } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [targetComment, setTargetComment] = useState<any>(null); // To pass full comment to handleReportComment

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
      addComment(work.id, commentText); // リアルタイム反映
      alert('コメントを送信しました');
      setCommentText('');
    }
  };

  const isStaff = userType === 'staff';

  const openActionModal = (comment: any) => {
    setSelectedCommentId(comment.id);
    setTargetComment(comment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCommentId(null);
    setTargetComment(null);
  };

  const confirmAction = () => {
    if (selectedCommentId) {
      if (isStaff) {
        deleteComment(work.id, selectedCommentId);
        alert('コメントを削除しました。');
      } else {
        // Pass the full comment object for reporting
        if (targetComment) {
          handleReportComment(work.id, targetComment);
        }
      }
      closeModal();
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

      case 'product':
        return (
          <div className="website-preview">
            {work.imageUrls.length > 0 && (
              <img
                src={work.imageUrls[0]}
                alt={`${work.title}のスクリーンショット`}
                className="website-screenshot"
              />
            )}
            {work.productUrl && (
              <div className="website-link-container">
                <a
                  href={work.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="website-link"
                >
                  <i className="fas fa-external-link-alt"></i> Webサイト/プロダクトを見る
                </a>
              </div>
            )}
          </div>
        );

      case 'other':
        return (
          <div className="website-preview"> {/* Reusing similar layout for other */}
            {work.imageUrls.length > 0 && (
              <img
                src={work.imageUrls[0]}
                alt={`${work.title}`}
                className="website-screenshot"
              />
            )}
            {work.otherUrl && (
              <div className="website-link-container">
                <a
                  href={work.otherUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="website-link"
                >
                  <i className="fas fa-external-link-alt"></i> リンクを開く
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
            {work.type === 'product' && <><i className="fas fa-box-open"></i> プロダクト</>}
            {work.type === 'zine' && <><i className="fas fa-book"></i> Zine</>}
            {work.type === 'other' && <><i className="fas fa-ellipsis-h"></i> その他</>}
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
              placeholder="コメントを入力..."
            ></textarea>
            <button type="submit" disabled={!commentText.trim()}>
              コメントを投稿
            </button>
          </form>
          <ul className="comment-list">
            {work.comments.length === 0 ? (
              <p>まだコメントはありません。</p>
            ) : (
              work.comments.map((c, index) => {
                const creator = c.userId ? getCreatorById(c.userId) : null;
                const userIcon = creator ? creator.profileIconUrl : null;
                const isGuest = !creator;

                return (
                  <li className="comment-item" key={index}>
                    <div className="comment-avatar">
                      {isGuest ? (
                        <div className="guest-icon"><i className="fas fa-user"></i></div>
                      ) : (
                        <Link to={`/profile/${c.userId}`}>
                          <img src={userIcon || ''} alt={c.userName} />
                        </Link>
                      )}
                    </div>
                    <div className="comment-content-wrapper">
                      <div className="comment-meta">
                        <strong>{c.userName}</strong>
                        <span>{c.date}</span>
                        <button
                          className={isStaff ? "delete-button" : "report-button"}
                          onClick={() => openActionModal(c)}
                        >
                          {isStaff ? '削除' : '通報'}
                        </button>
                      </div>
                      <p className="comment-text">{c.text}</p>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>

        {/* Job Request Section */}
        <JobRequestSection authorId={work.authorId} />
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p className="modal-text">
              {isStaff ? 'このコメントを削除しますか？' : 'このコメントを通報しますか？'}
            </p>
            <div className="modal-actions">
              <button className={`modal-button confirm ${isStaff ? 'delete' : ''}`} onClick={confirmAction}>
                {isStaff ? 'はい' : 'はい'}
              </button>
              <button className="modal-button cancel" onClick={closeModal}>いいえ</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const JobRequestSection: React.FC<{ authorId: string }> = ({ authorId }) => {
  const { getCreatorById } = useData();
  const author = getCreatorById(authorId);

  if (!author || !author.jobStatus) return null;

  const getStatusBadge = (status: 'accepting' | 'discussion' | 'closed') => {
    switch (status) {
      case 'accepting':
        return <span className="job-status-badge accepting">募集中</span>;
      case 'discussion':
        return <span className="job-status-badge discussion">相談可能</span>;
      case 'closed':
        return <span className="job-status-badge closed">募集停止中</span>;
      default:
        return null;
    }
  };

  return (
    <div className="job-request-section">
      <h3>お仕事依頼</h3>
      <div className="job-request-content">
        <p>このクリエイターにお仕事を依頼しますか？</p>
        <div className="job-status-display">
          <span>現在のステータス: </span>
          {getStatusBadge(author.jobStatus)}
        </div>
        <Link to={`/contact?subject=job`} className="job-request-button">
          お仕事依頼
        </Link>
      </div>
    </div>
  );
};

export default WorkDetail;