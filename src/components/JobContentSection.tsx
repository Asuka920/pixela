import React from 'react';

const JobContentSection: React.FC = () => {
    return (
        <section className="job-content-section">
            <h2 className="section-title">お仕事内容</h2>

            <div className="job-categories">
                {/* デザイン */}
                <div className="job-category-card design">
                    <div className="card-header">
                        <h3>デザイン</h3>
                    </div>
                    <div className="card-body">
                        <ul className="job-list">
                            <li>SNS投稿における画像・ショート動画の編集</li>
                            <li>WEB・グラフィックデザイン</li>
                            <li>ZINE(小冊子)の制作　　など</li>
                        </ul>

                        <div className="job-details">
                            <h4>携われる業務</h4>
                            <p>Instagram・X・TikTok・YouTube・note</p>

                            <h4>身につくスキル</h4>
                            <p>Adobe/illustrator/Photoshop/Premiere Pro/Canva/Figma/CLIP STUDIO</p>
                        </div>
                    </div>
                </div>

                {/* プロダクト開発 */}
                <div className="job-category-card product">
                    <div className="card-header">
                        <h3>プロダクト開発</h3>
                    </div>
                    <div className="card-body">
                        <ul className="job-list">
                            <li>アプリ開発・UIデザイン</li>
                            <li>業務自動化ツールの開発</li>
                            <li>AIを活用した各種開発　　など</li>
                        </ul>

                        <div className="job-details">
                            <h4>携われる業務</h4>
                            <p>chat-GPT・gemini・VS code・GitHub</p>

                            <h4>身につくスキル</h4>
                            <p>html/css/Javascript/Python/Ruby/スプレッドシート</p>
                        </div>
                    </div>
                </div>

                {/* マーケティング */}
                <div className="job-category-card marketing">
                    <div className="card-header">
                        <h3>マーケティング</h3>
                    </div>
                    <div className="card-body">
                        <ul className="job-list">
                            <li>WEBマーケティング・SNS運用</li>
                            <li>オフライン集客イベントの企画・運営</li>
                            <li>企業の採用代行　　など</li>
                        </ul>

                        <div className="job-details">
                            <h4>携われる業務</h4>
                            <p>Google広告・P-MAX・Meta広告・アフィリエイト広告</p>

                            <h4>身につくスキル</h4>
                            <p>総合的なマーケティングの企画・運用・分析スキル</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JobContentSection;
