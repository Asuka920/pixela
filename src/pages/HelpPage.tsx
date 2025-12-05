import React from 'react';

const HelpPage: React.FC = () => {
    return (
        <section id="help" className="page-section active-page help-section">
            <h2>ヘルプ</h2>
            <div className="help-content">
                <p>
                    Pixelaの利用方法やよくある質問については、こちらをご覧ください。
                </p>
                {/* 将来的にFAQなどを追加 */}
                <p>
                    ご不明な点がございましたら、お問い合わせフォームよりご連絡ください。
                </p>
            </div>
        </section>
    );
};

export default HelpPage;
