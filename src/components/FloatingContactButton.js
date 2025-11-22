import React, { useState } from 'react';
import './FloatingContactButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import Contact from './Contact';

const FloatingContactButton = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <button 
        className="floating-contact-btn"
        onClick={() => setIsContactOpen(true)}
        aria-label="Open contact form"
      >
        <FontAwesomeIcon icon={faEnvelope} className="floating-icon" />
      </button>

      <Contact 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)} 
      />
    </>
  );
};

export default FloatingContactButton;