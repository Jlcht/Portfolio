import React, { useState } from 'react';
import './Header.css';
import logoGN from '../assets/images/logo192.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import VideoModal from '../components/VideoModal';
import Banner from '../components/Banner';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const videoUrl = 'https://www.youtube.com/embed/-tnPCI5RdNA';

    const handleClick = (action) => {
        switch (action.type) {
            case 'modal':
                if (action.modalId === 'video') setIsModalOpen(true);
                break;
            case 'link':
                window.open(action.url, '_blank', 'noopener,noreferrer');
                break;
            case 'custom':
                if (typeof action.callback === 'function') action.callback();
                break;
            default:
                console.warn(`No action defined for type: ${action.type}`);
        }
    };

    return (
        <>
            {/* Banner now at the top */}
            <Banner text="Check my Github !" />

            <header className="header">
                <div className="header-left">
                    <img src={logoGN} alt="Logo" className="header-logo" />
                    <h1 className="header-title">Welcome</h1>
                </div>
                <nav className="header-nav">
                    <ul>
                        <li><a href="#features" className="nav-link">Features</a></li>
                        <li><a href="#pricing" className="nav-link">Pricing</a></li>
                        <li>
                            <button
                                className="nav-btn"
                                onClick={() => handleClick({ type: 'modal', modalId: 'video' })}
                            >
                                About
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-btn cta"
                                onClick={() =>
                                    handleClick({ type: 'link', url: 'https://www.linkedin.com/in/jean-luc-chumont' })
                                }
                            >
                                <FontAwesomeIcon icon={faLinkedin} className="cta-icon" />
                                LinkedIn
                            </button>
                        </li>
                    </ul>
                </nav>

                <VideoModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    videoUrl={videoUrl}
                />
            </header>
        </>
    );
};

export default Header;
