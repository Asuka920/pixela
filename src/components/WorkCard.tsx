// src/components/WorkCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Work } from '../types';//'type'

interface WorkCardProps {
  work: Work;
}

const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  const { toggleLike, getWorkById } = useData();

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
        <button
          className="like-button"
          onClick={handleLikeClick}
          aria-label={currentWork.liked ? 'いいねを取り消す' : 'いいねする'}
        >
          <i className={`${currentWork.liked ? 'fas' : 'far'} fa-heart`}></i>
          <span>{currentWork.likes}</span>
        </button>
      </div>
    </div>
  );
};

export default WorkCard;