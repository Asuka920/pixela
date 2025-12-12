import React from 'react';

const WhatsSection: React.FC = () => {
    return (
        <section className="whats-section">
            <div className="whats-inner">
                <h2 className="whats-title">What's ノマドLaB</h2>
                <h3 className="whats-heading">働くっておもしろい。そう思える体験を。</h3>
                <div className="whats-content">
                    <p>
                        海外でも活躍するAIエンジニアやWebマーケターのもとで実務に関わり<br />
                        働くおもしろさや可能性に出会える場所です。
                    </p>
                    <ul className="whats-list">
                        <li>B型で無理なく働きたい、でもしっかり稼ぎたい。</li>
                        <li>一般就労やフリーランスなど、自分に合った形で社会とつながりたい。</li>
                    </ul>
                    <p>
                        困りごとや生きづらさがあっても<br />
                        「おもしろく働くこと」や「働くことで人生を豊かにすること」<br />
                        をあきらめたくない―
                    </p>
                    <p className="whats-highlight">
                        そんな思いに寄り添う場所です。
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhatsSection;
