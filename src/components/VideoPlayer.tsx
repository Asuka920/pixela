// src/components/VideoPlayer.tsx
import React from 'react';

interface VideoPlayerProps {
    videoUrl: string;
    title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title }) => {
    // YouTube URLからビデオIDを抽出
    const getYouTubeEmbedUrl = (url: string): string | null => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}`;
        }
        return null;
    };

    // Vimeo URLからビデオIDを抽出
    const getVimeoEmbedUrl = (url: string): string | null => {
        const regExp = /vimeo\.com\/(\d+)/;
        const match = url.match(regExp);

        if (match && match[1]) {
            return `https://player.vimeo.com/video/${match[1]}`;
        }
        return null;
    };

    // 埋め込みURLを取得
    const getEmbedUrl = (): string | null => {
        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
            return getYouTubeEmbedUrl(videoUrl);
        } else if (videoUrl.includes('vimeo.com')) {
            return getVimeoEmbedUrl(videoUrl);
        }
        return null;
    };

    const embedUrl = getEmbedUrl();

    if (!embedUrl) {
        return (
            <div className="video-player-error">
                <p>動画を読み込めませんでした。</p>
                <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                    元の動画を見る
                </a>
            </div>
        );
    }

    return (
        <div className="video-player-container">
            <iframe
                src={embedUrl}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-player-iframe"
            />
        </div>
    );
};

export default VideoPlayer;
