// src/pages/Home.tsx
import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import Slideshow from '../components/Slideshow';
import WorkGrid from '../components/WorkGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import { Work } from '../types';

const LOAD_STEP = 3; //

const Home: React.FC = () => {
  const { works } = useData();
  const { isLoggedIn } = useAuth();
  
  // script.jsのdisplayCounts
  const [counts, setCounts] = useState({ personalized: LOAD_STEP, new: LOAD_STEP });

  // script.jsのpopularWorks
  const popularWorks = useMemo(() => 
    [...works]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 5)
      .map(w => ({ 
        id: w.id,
        title: w.title,
        imageUrl: w.imageUrls[0], 
        description: w.description.substring(0, 30) + '...' 
      })),
    [works]
  );

  // script.jsのpersonalizedWorksAll
  const personalizedWorksAll = useMemo(() => 
    isLoggedIn ? works.filter(w => w.liked) : works,
    [works, isLoggedIn]
  );
  
  // script.jsのnewWorksAll
  const newWorksAll = useMemo(() => 
    [...works].sort((a, b) => b.id - a.id),
    [works]
  );

  const loadMore = (type: 'personalized' | 'new') => {
    setCounts(prev => ({
      ...prev,
      [type]: prev[type] + LOAD_STEP
    }));
  };

  const getVisibleWorks = (allWorks: Work[], count: number) => allWorks.slice(0, count);

  // CSSクラス .active-page を適用
  return (
    <section id="home" className="page-section active-page">
      <section className="popular-works-slideshow"> {/* */}
        <h2>今人気の作品</h2>
        {works.length ? <Slideshow works={popularWorks} /> : <LoadingSpinner />}
      </section>
      
      <section className="works-feed personalized-works"> {/* */}
        <h2>あなたへのおすすめ</h2>
        {works.length ? (
          <WorkGrid works={getVisibleWorks(personalizedWorksAll, counts.personalized)} />
        ) : (
          <LoadingSpinner />
        )}
        <div className="load-more-container">
          {counts.personalized < personalizedWorksAll.length && (
            <button 
              className="load-more-button" 
              onClick={() => loadMore('personalized')}
            >
              もっと見る
            </button>
          )}
        </div>
      </section>

      <section className="works-feed new-works"> {/* */}
        <h2>新着作品</h2>
        {works.length ? (
          <WorkGrid works={getVisibleWorks(newWorksAll, counts.new)} />
        ) : (
          <LoadingSpinner />
        )}
        <div className="load-more-container">
          {counts.new < newWorksAll.length && (
            <button 
              className="load-more-button" 
              onClick={() => loadMore('new')}
            >
              もっと見る
            </button>
          )}
        </div>
      </section>
    </section>
  );
};

export default Home;