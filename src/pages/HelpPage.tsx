import React from 'react';

const HelpPage: React.FC = () => {
    return (
        <section id="help" className="page-section active-page help-section">
            <h2>ヘルプ</h2>
            <div className="help-content">
                <p>
                    Pixelaの利用方法やよくある質問については、こちらをご覧ください。
                </p>

                <div className="faq-section">
                    <h3>よくある質問</h3>
                    <dl className="faq-list">
                        <div className="faq-item">
                            <dt>Q: Pixelaとは何ですか？</dt>
                            <dd>A: Pixelaは、クリエイターが自身の作品を公開し、交流することができるポートフォリオサイトです。</dd>
                        </div>
                        <div className="faq-item">
                            <dt>Q: 会員登録は無料ですか？</dt>
                            <dd>A: はい、会員登録および基本的な機能の利用は無料です。</dd>
                        </div>
                        <div className="faq-item">
                            <dt>Q: 作品を投稿するにはどうすればよいですか？</dt>
                            <dd>A: ログイン後、ヘッダーの「作品アップロードページ」から投稿することができます。</dd>
                        </div>
                        <div className="faq-item">
                            <dt>Q: 推奨環境を教えてください。</dt>
                            <dd>A: 最新のGoogle Chrome、Firefox、Safari、Edgeでのご利用を推奨しています。</dd>
                        </div>
                    </dl>
                </div>

                <p>
                    ご不明な点がございましたら、お問い合わせフォームよりご連絡ください。
                </p>
            </div>
        </section>
    );
};

export default HelpPage;
