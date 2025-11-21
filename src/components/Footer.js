import React from 'react';
import './Footer.css';
import logoGN from '../assets/images/logo192.png';

const Footer = () => {
  const resumePdfUrl = '/CV_Jean-Luc_CHUMONT_EN.pdf'; // Place PDF in public folder
  
  const footerSections = [
    {
      title: 'About Me',
      links: [
        { label: 'Portfolio', url: '#portfolio' },
        { label: 'Resume', url: resumePdfUrl, external: true },
        { label: 'Projects', url: '#projects' },
        { label: 'Contact', url: '#contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Web Development', url: '#web-dev' },
        { label: 'UI/UX Design', url: '#design' },
        { label: 'Consulting', url: '#consulting' },
        { label: 'Code Review', url: '#review' }
      ]
    },
    {
      title: 'Connect',
      links: [
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jean-luc-chumont' },
        { label: 'GitHub', url: 'https://github.com/Jlcht' },
        { label: 'Email', url: 'mailto:jl75ch@gmail.com' }
      ]
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo-section">
          <img src={logoGN} alt="Logo" className="footer-logo" />
        </div>
        
        <div className="footer-content">
          {footerSections.map((section, index) => (
            <div key={index} className="footer-column">
              <h3 className="footer-title">{section.title}</h3>
              <ul className="footer-links">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url} 
                      className="footer-link"
                      target={link.url.startsWith('http') || link.external ? '_blank' : '_self'}
                      rel={link.url.startsWith('http') || link.external ? 'noopener noreferrer' : ''}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} Jean-Luc Chumont. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;