import React from 'react';

const AccessSection: React.FC = () => {
    return (
        <section className="access-section">
            <h2 className="section-title">見学・体験随時募集</h2>

            <div className="access-content">
                <div className="access-info">
                    <p className="access-station">八丁堀駅徒歩2分</p>
                    <p className="access-phone">080-9950-5593</p>
                    <p className="access-email">info@nmdlab.jp</p>
                    <p className="access-address">
                        広島県広島市中区八丁堀６番３号<br />
                        和光八丁堀ビル５階
                    </p>
                </div>

                <div className="access-map">
                    <img src="/map.png" alt="アクセスマップ" />
                </div>
            </div>
        </section>
    );
};

export default AccessSection;
