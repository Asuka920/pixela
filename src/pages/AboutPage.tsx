// src/pages/AboutPage.tsx
import React from 'react';
import JobContentSection from '../components/JobContentSection';
import WagesAndTargetSection from '../components/WagesAndTargetSection';
import SupportSystemSection from '../components/SupportSystemSection';
import DreamSupportSection from '../components/DreamSupportSection';
import OfficeEnvironmentSection from '../components/OfficeEnvironmentSection';
import AccessSection from '../components/AccessSection';

const AboutPage: React.FC = () => {
  return (
    <section id="about" className="page-section active-page about-section">
      <JobContentSection />
      <WagesAndTargetSection />
      <SupportSystemSection />
      <DreamSupportSection />
      <OfficeEnvironmentSection />
      <AccessSection />
      <h2>私たちについて</h2>
      <div className="about-content">
        <p>
          当事業所は、就労継続支援B型事業所として、メンバー一人ひとりの創造性と可能性を最大限に引き出すサポートを行っています。
          このポートフォリオサイトは、メンバーの皆さんが制作した作品を世界に発信し、実績を可視化するためのプラットフォームです。
        </p>

        <h3>ビジョン</h3>
        <p>「創造性を、力に。一人ひとりの個性を活かした就労支援」</p>

        <h3>サービス内容</h3>
        <ul>
          <li><strong>デジタルアート制作</strong>: イラスト、デザイン、写真編集など</li>
          <li><strong>動画・アニメーション制作</strong>: 動画編集、アニメーション制作</li>
          <li><strong>ゲーム制作</strong>: Scratchなどを使ったゲーム開発</li>
          <li><strong>Web制作</strong>: HTML/CSS/JavaScriptを使ったWebサイト制作</li>
          <li><strong>ZINE制作</strong>: 写真集、作品集などの制作</li>
        </ul>

        <h3>サポート体制</h3>
        <ul>
          <li>個別支援計画に基づいた丁寧な指導</li>
          <li>専門スタッフによる技術サポート</li>
          <li>作品発表の機会提供</li>
          <li>就職活動のサポート</li>
        </ul>

        <h3>主な機能</h3>
        <ul>
          <li>多様な作品タイプの投稿・公開</li>
          <li>メンバープロフィールの充実</li>
          <li>作品検索・フィルタリング機能</li>
          <li>制作情報・受賞歴の記録</li>
        </ul>
      </div>
    </section>
  );
};

export default AboutPage;