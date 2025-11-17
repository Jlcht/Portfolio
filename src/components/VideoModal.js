import React from 'react';
import './VideoModal.css';

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <div className="modal-video-wrapper">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`${videoUrl}?autoplay=1`}
                        title="Video Modal"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
