// src/pages/Home.tsx
import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

import { Link } from 'react-router-dom';
import Slideshow from '../components/Slideshow';

import WorkGrid from '../components/WorkGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import { Work } from '../types';

const LOAD_STEP = 3; //

const Home: React.FC = () => {
  const { works } = useData();
  const { isLoggedIn, userType } = useAuth();
  const isStaff = userType === 'staff';


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
      <nav className="home-nav-menu">
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/find-works">WORKS</Link></li>
          <li><Link to="/members">MEMBERS</Link></li>
          {isLoggedIn && <li><Link to="/tenants">GROUP</Link></li>}
          {isLoggedIn && !isStaff && (
            <>
              <li><Link to="/upload">POST</Link></li>
              <li><Link to="/edit-works">EDIT</Link></li>
            </>
          )}
          {isLoggedIn && (
            <li><Link to="/mypage">{isStaff ? '管理ページ' : 'MY PAGE'}</Link></li>
          )}
        </ul>
      </nav>

      <section className="hero-section">
        <div className="hero-slideshow-container">
          {works.length ? <Slideshow works={popularWorks} /> : <LoadingSpinner />}
        </div>
        <div className="hero-text-container">
          <div className="hero-text-content">
            <div className="hero-logo-container">
              <img src="/logo-nomadlab.png" alt="ノマドLaBロゴ" />
            </div>
            <div className="hero-text-lines">
              <span className="hero-text-line">Pixelaは、</span>
              <span className="hero-text-line">ノマドLaBが運営する</span>
              <span className="hero-text-line">ポートフォリオサイトです。</span>
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