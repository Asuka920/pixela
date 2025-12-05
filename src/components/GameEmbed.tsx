// src/components/GameEmbed.tsx
import React from 'react';

interface GameEmbedProps {
    gameUrl: string;
    title: string;
}

const GameEmbed: React.FC<GameEmbedProps> = ({ gameUrl, title }) => {
    return (
        <div className="game-embed-container">
            <iframe
                src={gameUrl}
                title={title}
                frameBorder="0"
                allowFullScreen
                className="game-embed-iframe"
            />
            <div className="game-embed-actions">
                <a
                    href={gameUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="game-external-link"
                >
                    <i className="fas fa-external-link-alt"></i> 新しいタブで開く
                </a>
            </div>
        </div>
    );
};

export default GameEmbed;
