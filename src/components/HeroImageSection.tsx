import React from 'react';

const HeroImageSection: React.FC = () => {
    return (
        <section className="hero-image-section">
            <div className="hero-image-container">
                <img src="/home image.jpg" alt="Nomad LAB Home" className="hero-image" />
            </div>
        </section>
    );
};

export default HeroImageSection;
