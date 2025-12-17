// src/components/Slideshow.tsx
import React, { useState, useEffect, useMemo } from 'react';
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

  // CSS transform を計算
  const transformStyle = useMemo(() => ({
    transform: `translateX(-${currentIndex * 100}%)` //
  }), [currentIndex]);

  if (!works.length) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="slideshow-container" id="popular-slideshow-container"> {/* */}
      <div
        className="slideshow-wrapper"
        id="popular-slideshow-wrapper"
        style={transformStyle}
      > {/* */}
        {works.map((work) => (
          <Link to={`/work/${work.id}`} key={work.id} className="slide"> {/* */}
            <img src={work.imageUrl} alt={work.title} loading="lazy" />
            <div className="slide-info"> {/* */}
              <h3>{work.title}</h3>
              <p>{work.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;