import React from 'react';

const HeroSection: React.FC = () => {
    return (
        <section className="hero-section">
            <div className="hero-inner">
                <p className="hero-tagline">稼いで、学んで、成長できる就労移行支援B型</p>
                <div className="hero-logo-area">
                    <h1 className="hero-logo-text">ノマドLaB</h1>
                </div>
                <h2 className="hero-subheading">あなたの“やってみたい”が仕事になる</h2>
                <div className="hero-highlight-box">
                    <p className="hero-highlight">工賃10万円以上可能</p>
                </div>
                <div className="hero-skills-container">
                    <ul className="hero-skills">
                        <li>AI 駆動開発・プログラミング</li>
                        <li>WEB マーケティング</li>
                        <li>動画編集・SNS 運用</li>
                        <li>グラフィック・WEB デザイン</li>
                    </ul>
                </div>
                <p className="hero-footer-note">A 型・移行支援を検討中の方にもおすすめ</p>
            </div>
        </section>
    );
};

export default HeroSection;
