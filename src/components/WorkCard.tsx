// src/components/WorkCard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Work } from '../types';//'type'

interface WorkCardProps {
  work: Work;
  isEditable?: boolean;
}

const WorkCard: React.FC<WorkCardProps> = ({ work, isEditable = false }) => {
  const { toggleLike, getWorkById, deleteWork } = useData();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Get the latest work state from context to ensure likes are reactive
  const currentWork = getWorkById(work.id) || work;

  // カード内のボタンクリックでページ遷移しないように
  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(work.id);
  };

  return (
    <div className="work-card">
      <Link to={`/work/${currentWork.id}`}>
        <img src={currentWork.imageUrls[0]} alt={currentWork.title} loading="lazy" />
        <div className="work-info">
          <h3>{currentWork.title}</h3>
        </div>
      </Link>
      <div className="work-meta">
        <Link to={`/profile/${currentWork.authorId}`} className="author-link">
          <i className="fas fa-user-circle"></i>
          <span>{currentWork.author}</span>
        </Link>
        {isEditable ? (
          <div className="work-actions">
            <Link to={`/work/edit/${currentWork.id}`} className="edit-button">
              編集
            </Link>
            <button className="delete-button" onClick={() => setShowDeleteModal(true)}>
              削除
            </button>
          </div>
        ) : (
          <button
            className="like-button"
            onClick={handleLikeClick}
            aria-label={currentWork.liked ? 'いいねを取り消す' : 'いいねする'}
          >
            <i className={`${currentWork.liked ? 'fas' : 'far'} fa-heart`}></i>
            <span>{currentWork.likes}</span>
          </button>
        )}
      </div>

      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>この作品「{currentWork.title}」を削除しますか？</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)}>キャンセル</button>
              <button
                className="delete-confirm-button"
                onClick={() => {
                  deleteWork(currentWork.id);
                  setShowDeleteModal(false);
                }}
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkCard;