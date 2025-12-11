import React from 'react';

const OfficeEnvironmentSection: React.FC = () => {
    return (
        <section className="office-environment-section">
            <div className="office-grid">
                <div className="office-main-image">
                    <img src="/office image01.jpg" alt="オフィス環境 メイン" />
                </div>
                <div className="office-sub-images">
                    <div className="office-sub-image">
                        <img src="/office image02.jpg" alt="オフィス環境 サブ1" />
                    </div>
                    <div className="office-sub-image">
                        <img src="/office image03.jpg" alt="オフィス環境 サブ2" />
                    </div>
                </div>
            </div>
            <p className="office-caption">シェアオフィスをイメージした、清潔感ある明るい事業所</p>

            <div className="office-additional-grid">
                {/* 左側ブロック */}
                <div className="office-block">
                    <div className="office-stacked-images">
                        <div className="office-image-wrapper">
                            <img src="/office image04.jpg" alt="個室スペース1" />
                        </div>
                        <div className="office-image-wrapper">
                            <img src="/office image05.jpg" alt="個室スペース2" />
                        </div>
                    </div>
                    <p className="office-sub-caption">扉付き個室スペース完備</p>
                </div>

                {/* 右側ブロック */}
                <div className="office-block">
                    <div className="office-stacked-images">
                        <div className="office-image-wrapper">
                            <img src="/office image06.jpg" alt="パーテーションスペース1" />
                        </div>
                        <div className="office-image-wrapper">
                            <img src="/office image07.jpg" alt="パーテーションスペース2" />
                        </div>
                    </div>
                    <p className="office-sub-caption">パーテーションあり</p>
                </div>
            </div>
        </section>
    );
};

export default OfficeEnvironmentSection;
