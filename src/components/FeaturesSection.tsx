import React from 'react';
import { Link } from 'react-router-dom';

const FeaturesSection: React.FC = () => {
    const features = [
        "お金をもらいながら実践的に学べる",
        "就職・独立に役立つポートフォリオが作れる",
        "就職支援・独立サポートが充実",
        "体調やペースに合わせた無理のない通所が可能"
    ];

    return (
        <section className="features-section">
            <div className="features-inner">
                <h2 className="features-title">ノマドLaBはこんなところ</h2>
                <ul className="features-list">
                    {features.map((feature, index) => (
                        <li key={index} className="feature-item">
                            <span className="feature-icon">✨</span>
                            <span className="feature-text">{feature}</span>
                        </li>
                    ))}
                </ul>
                <div className="features-more-container">
                    <Link to="/about" className="features-more-button">
                        ノマドLaBをもっと知る <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
