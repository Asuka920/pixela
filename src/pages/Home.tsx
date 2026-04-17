// src/pages/Home.tsx
import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';

import { Link } from 'react-router-dom';
import Slideshow from '../components/Slideshow';

import WorkGrid from '../components/WorkGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import { Work } from '../types';

const LOAD_STEP = 3; //

const Home: React.FC = () => {
  const { works } = useData();


  // 表示数管理
  const [counts, setCounts] = useState({ works: LOAD_STEP, personal: LOAD_STEP });

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



  // script.jsのnewWorksAll
  const newWorksAll = useMemo(() =>
    [...works].sort((a, b) => b.id - a.id),
    [works]
  );

  const worksFiltered = useMemo(() => 
    newWorksAll.filter(w => w.workType === 'Works'),
    [newWorksAll]
  );

  const personalFiltered = useMemo(() => 
    newWorksAll.filter(w => w.workType === '個人制作'),
    [newWorksAll]
  );

  const loadMore = (type: keyof typeof counts) => {
    setCounts(prev => ({
      ...prev,
      [type]: prev[type] + LOAD_STEP
    }));
  };

  const getVisibleWorks = (allWorks: Work[], count: number) => allWorks.slice(0, count);

  // CSSクラス .active-page を適用
  return (
    <section id="home" className="page-section active-page">

      <section className="hero-section">
        <div className="hero-slideshow-container">
          {works.length ? <Slideshow works={popularWorks} /> : <LoadingSpinner />}
        </div>
        <div className="hero-text-container">
          <div className="hero-text-content">
            <div className="hero-text-lines">
              <p className="hero-text">
                Pixelaは、ノマドLaBが運営するポートフォリオサイトです。
              </p>
            </div>
            <Link to="/find-works" className="hero-works-button">作品一覧へ</Link>
          </div>
        </div>
      </section>

      <section className="works-feed new-works"> {/* */}
        <h2>WORKS</h2>
        {works.length ? (
          <WorkGrid works={getVisibleWorks(worksFiltered, counts.works)} />
        ) : (
          <LoadingSpinner />
        )}
        <div className="load-more-container">
          {counts.works < worksFiltered.length && (
            <button
              className="load-more-button"
              onClick={() => loadMore('works')}
            >
              read more
            </button>
          )}
        </div>
      </section>

      <section className="works-feed personal-works">
        <h2>個人制作</h2>
        {works.length ? (
          <WorkGrid works={getVisibleWorks(personalFiltered, counts.personal)} />
        ) : (
          <LoadingSpinner />
        )}
        <div className="load-more-container">
          {counts.personal < personalFiltered.length && (
            <button
              className="load-more-button"
              onClick={() => loadMore('personal')}
            >
              read more
            </button>
          )}
        </div>
      </section>
    </section>
  );
};

export default Home;