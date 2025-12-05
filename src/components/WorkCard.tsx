// src/components/WorkCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Work } from '../types';//'type'

interface WorkCardProps {
  work: Work;
}

const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  const { toggleLike } = useData();

  // カード内のボタンクリックでページ遷移しないように
  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    toggleLike(work.id);
  };

  return (
    <div className="work-card"> {/* */}
      <Link to={`/work/${work.id}`}>
        <img src={work.imageUrls[0]} alt={work.title} loading="lazy" />
        <div className="work-info">
          <h3>{work.title}</h3>
        </div>
      </Link>
      <div className="work-meta"> {/* */}
        <Link to={`/profile/${work.authorId}`} className="author-link">
          <i className="fas fa-user-circle"></i>
          <span>{work.author}</span>
        </Link>
        <button 
          className="like-button" 
          onClick={handleLikeClick}
          aria-label={work.liked ? 'いいねを取り消す' : 'いいねする'}
        >
          <i className={`${work.liked ? 'fas' : 'far'} fa-heart`}></i> {/* */}
          <span>{work.likes}</span>
        </button>
      </div>
    </div>
  );
};

export default WorkCard;