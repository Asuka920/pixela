// src/components/WorkCard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Work } from '../types';

interface WorkCardProps {
  work: Work;
  isEditable?: boolean;
}

const WorkCard: React.FC<WorkCardProps> = ({ work, isEditable = false }) => {
  const { getWorkById, deleteWork } = useData();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Get the latest work state from context to ensure likes are reactive
  const currentWork = getWorkById(work.id) || work;

  // Format date to YYYY.MM.DD
  const rawDate = currentWork.uploadedDate || currentWork.createdDate || '2026-01-01';
  const formattedDate = rawDate.replace(/-/g, '.');

  // Extract first tag for category
  const categoryName = currentWork.tags && currentWork.tags.length > 0 ? currentWork.tags[0] : currentWork.type;

  return (
    <div className={isEditable ? "work-card" : "work-thumbnail-wrapper"}>
      <Link to={`/work/${currentWork.id}`} className="work-image-link" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="work-image-square">
          <img src={currentWork.imageUrls[0]} alt={currentWork.title} loading="lazy" />
        </div>
      </Link>
      <div className={isEditable ? "work-info" : "work-thumbnail-info"}>
        {!isEditable && (
          <>
            <div className="work-date">{formattedDate}</div>
            <div className="work-category">
              <Link to={`/find-works?category=${encodeURIComponent(categoryName)}`} className="category-link">
                #{categoryName}
              </Link>
            </div>
          </>
        )}
        <h3>
          <Link to={`/work/${currentWork.id}`} className="work-title-link">
            {currentWork.title}
          </Link>
        </h3>
        
        {/* Editable specifics inside info if needed, but currently just title is fine */}
      </div>
      
      {isEditable && (
        <div className="work-meta">
          <div className="work-actions">
            <Link to={`/work/edit/${currentWork.id}`} className="edit-button">
              編集
            </Link>
            <button className="delete-button" onClick={() => setShowDeleteModal(true)}>
              削除
            </button>
          </div>
        </div>
      )}

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