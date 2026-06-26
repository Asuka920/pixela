// src/components/Slideshow.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface SlideshowWork {
  id: number;
  title: string;
  imageUrl: string; // imageUrls[0] を想定
  description: string;
}

interface SlideshowProps {
  works: SlideshowWork[];
}

const Slideshow: React.FC<SlideshowProps> = ({ works }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // script.jsのshowSlidesロジック
  useEffect(() => {
    if (works.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % works.length);
    }, 3000); // 3秒

    return () => clearInterval(interval); // クリーンアップ
  }, [works.length]);

  if (!works.length) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="slideshow-container" id="popular-slideshow-container"> {/* */}
      <div
        className="slideshow-wrapper"
        id="popular-slideshow-wrapper"
      > {/* */}
        {works.map((work, index) => (
          <Link 
            to={`/work/${work.id}`} 
            key={work.id} 
            className={`slide ${index === currentIndex ? 'active' : ''}`}
          > {/* */}
            <img src={work.imageUrl} alt={work.title} loading="lazy" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;