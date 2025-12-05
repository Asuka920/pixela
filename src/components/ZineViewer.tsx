// src/components/ZineViewer.tsx
import React, { useState } from 'react';

interface ZineViewerProps {
    imageUrls: string[];
    pdfUrl?: string;
    title: string;
}

const ZineViewer: React.FC<ZineViewerProps> = ({ imageUrls, pdfUrl, title }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const nextPage = () => {
        if (currentPage < imageUrls.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="zine-viewer-container">
            {pdfUrl ? (
                <div className="zine-pdf-viewer">
                    <iframe
                        src={pdfUrl}
                        title={title}
                        className="zine-pdf-iframe"
                    />
                    <div className="zine-download-link">
                        <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-download"></i> PDFをダウンロード
                        </a>
                    </div>
                </div>
            ) : (
                <div className="zine-image-gallery">
                    <div className="zine-page-display">
                        <img
                            src={imageUrls[currentPage]}
                            alt={`${title} - ページ ${currentPage + 1}`}
                            className="zine-page-image"
                        />
                    </div>
                    <div className="zine-navigation">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            className="zine-nav-button"
                        >
                            <i className="fas fa-chevron-left"></i> 前のページ
                        </button>
                        <span className="zine-page-indicator">
                            {currentPage + 1} / {imageUrls.length}
                        </span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === imageUrls.length - 1}
                            className="zine-nav-button"
                        >
                            次のページ <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    <div className="zine-thumbnail-strip">
                        {imageUrls.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`ページ ${index + 1}`}
                                className={`zine-thumbnail ${index === currentPage ? 'active' : ''}`}
                                onClick={() => setCurrentPage(index)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ZineViewer;
