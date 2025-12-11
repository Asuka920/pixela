import React from 'react';

const SupportSystemSection: React.FC = () => {
    return (
        <section className="support-system-section">
            <h2 className="section-title">充実したサポート体制をご用意</h2>

            <div className="support-grid">
                {/* 体調不安のある方 */}
                <div className="support-card">
                    <div className="support-icon">🏥</div>
                    <h3>体調不安のある方</h3>
                    <ul className="support-list">
                        <li>週３〜OK</li>
                        <li>午前のみ/午後のみ可</li>
                    </ul>
                </div>

                {/* 実務が不安な方 */}
                <div className="support-card">
                    <div className="support-icon">🔰</div>
                    <h3>実務が不安な方</h3>
                    <ul className="support-list">
                        <li>学び特化コースあり</li>
                    </ul>
                </div>

                {/* グループ部門との連携 */}
                <div className="support-card">
                    <div className="support-icon">🤝</div>
                    <h3>グループ部門との連携</h3>
                    <ul className="support-list">
                        <li>人材サービス</li>
                        <li>グループホーム</li>
                        <li>訪問看護</li>
                    </ul>
                </div>

                {/* 飲み放題 */}
                <div className="support-card">
                    <div className="support-icon">☕</div>
                    <h3>飲み放題</h3>
                    <ul className="support-list">
                        <li>コーヒーマシン</li>
                        <li>ウォーターサーバー</li>
                        <li className="highlight-text">/1日10円</li>
                    </ul>
                </div>

                {/* 食事提供あり */}
                <div className="support-card">
                    <div className="support-icon">🍱</div>
                    <h3>食事提供あり</h3>
                    <ul className="support-list">
                        <li>1食150円</li>
                        <li className="note-text">※規定あり</li>
                    </ul>
                </div>

                {/* 本が充実 */}
                <div className="support-card">
                    <div className="support-icon">📚</div>
                    <h3>本が充実</h3>
                    <ul className="support-list">
                        <li>貸出OK</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default SupportSystemSection;
