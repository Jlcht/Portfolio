import React from 'react';
import './Footer.css';
import albumCover from '../assets/images/Dracula_by_Tame_Impala.jpg';
import profilePhoto from '../assets/images/photo_cv_visage_2.jpg';

const Footer = () => {
  const resumePdfUrl = '/CV_Jean-Luc_CHUMONT_EN.pdf';
  
  const connectLinks = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jean-luc-chumont' },
    { label: 'GitHub', url: 'https://github.com/Jlcht' },
    { label: 'Email', url: 'mailto:jl75ch@gmail.com' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Currently Vibing Section */}
          <div className="footer-section footer-vibing">
            <h3 className="footer-section-title">Currently vibing to:</h3>
            <div className="vibing-content">
              <img src={albumCover} alt="Dracula by Tame Impala" className="album-cover" />
              <div className="song-info">
                <p className="song-title">Dracula</p>
                <p className="song-artist">By Tame Impala</p>
              </div>
            </div>
          </div>

          {/* Center Section */}
          <div className="footer-section footer-center">
            <h2 className="footer-thank-you">Thanks for stopping by!</h2>
            <a 
              href="https://www.camiferreol.com" 
              className="style-inspiration-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Style inspiration
            </a>
          </div>

          {/* Profile Photo Section */}
          <div className="footer-section footer-profile">
            <div className="profile-photo-wrapper">
              <img src={profilePhoto} alt="Jean-Luc Chumont" className="profile-photo" />
            </div>
          </div>
        </div>

        {/* Connect Links */}
        <div className="footer-connect">
          <h3 className="connect-title">Connect</h3>
          <ul className="connect-links">
            {connectLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.url} 
                  className="connect-link"
                  target={link.url.startsWith('http') ? '_blank' : '_self'}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Jean-Luc Chumont. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;