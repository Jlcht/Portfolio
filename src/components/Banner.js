import React from 'react';
import './Banner.css';

const Banner = () => {
    const text = "I am currently looking for an internship for September 2026, if you have any opportunity or would like to collaborate with me, please feel free to hit me up !";
    
    return (
        <div className="scrolling-banner">
            <div className="scrolling-banner-content">
                <span className="scrolling-text">{text}</span>
                <span className="scrolling-text">{text}</span>
                <span className="scrolling-text">{text}</span>
                <span className="scrolling-text">{text}</span>
            </div>
        </div>
    );
};

export default Banner;
