import React from 'react';
import './Banner.css';

const Banner = ({ text }) => {
    const handleClick = () => {
        window.open('https://github.com/Jlcht', '_blank');
    };

    return (
        <div className="banner" onClick={handleClick}>
            <p className="banner-text">{text}</p>
        </div>
    );
};

export default Banner;
