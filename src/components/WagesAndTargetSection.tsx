import React from 'react';

const WagesAndTargetSection: React.FC = () => {
    return (
        <div className="wages-target-container">
            {/* 工賃のめやす セクション */}
            <section className="wages-section">
                <h2 className="section-title">工賃のめやす</h2>
                <div className="wages-content">
                    <div className="pie-chart-container">
                        <div className="pie-chart"></div>
                    </div>
                    <div className="wages-legend">
                        <div className="legend-item">
                            <span className="color-box color-1"></span>
                            <span className="label">～30,000円 (40%)</span>
                        </div>
                        <div className="legend-item">
                            <span className="color-box color-2"></span>
                            <span className="label">～50,000円 (25%)</span>
                        </div>
                        <div className="legend-item">
                            <span className="color-box color-3"></span>
                            <span className="label">～75,000円 (20%)</span>
                        </div>
                        <div className="legend-item">
                            <span className="color-box color-4"></span>
                            <span className="label">75,000円以上 (10%)</span>
                        </div>
                        <div className="legend-item">
                            <span className="color-box color-5"></span>
                            <span className="label">10,000円未満 (5%)</span>
                        </div>
                    </div>
                    <p className="wages-date">※2025年10月時点</p>
                </div>
            </section>

            {/* こんな方におすすめ セクション */}
            <section className="target-section">
                <h2 className="section-title">こんな方におすすめ</h2>
                <div className="target-content">
                    <ul className="target-list">
                        <li>復職を目指している方</li>
                        <li>A型・移行支援を検討中の方</li>
                        <li>月給10万円以上を目指したい方</li>
                        <li>無理なく学びに集中したい方</li>
                        <li>静かに集中して作業したい方</li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default WagesAndTargetSection;
