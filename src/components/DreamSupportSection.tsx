import React from 'react';

const DreamSupportSection: React.FC = () => {
    return (
        <section className="dream-support-section">
            <h2 className="section-title">ノマドLaBはあなたの夢を応援します</h2>

            <div className="dream-support-grid">
                {/* 一般就労サポート */}
                <div className="dream-card general-support">
                    <div className="dream-card-header">
                        <h3>一般就労サポート</h3>
                        <p className="dream-subtitle">グループの人材サービス部門と連携し<br />就職活動を幅広くサポート。</p>
                    </div>
                    <div className="dream-card-body">
                        <ul className="dream-list">
                            <li>就職先のご紹介（豊富な選択肢）</li>
                            <li>履歴書添削や模擬面接の実施</li>
                            <li>業界・企業研究の支援</li>
                        </ul>
                    </div>
                </div>

                {/* 独立支援 */}
                <div className="dream-card freelance-support">
                    <div className="dream-card-header">
                        <h3>独立支援</h3>
                        <p className="dream-subtitle">フリーランスのキャリア形成を<br />幅広くサポート。</p>
                    </div>
                    <div className="dream-card-body">
                        <ul className="dream-list">
                            <li>事業所での取り組みを反映したポートフォリオ作成支援</li>
                            <li>各種手続きや確定申告のご相談</li>
                            <li>独立後の勉強会へのご招待</li>
                            <li>独立後の営業先や案件のご紹介</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DreamSupportSection;
