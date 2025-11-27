import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';
import codeImage from '../assets/images/code_illu.jpg';
import jsImage from '../assets/images/js_illu.jpg';
import utbmLogo from '../assets/images/utbm_logo.jpg';

const Gallery = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const cardRefs = useRef([]);
  const [cardIsVisible, setCardIsVisible] = useState([]);
  const navigate = useNavigate();

  const cards = [
    { 
      id: 1, 
      category: 'PROFESSIONAL EXPERIENCE', 
      title: 'Professional Journey', 
      image: codeImage, 
      alt: 'Code illustration',
      path: '/professional-experience'
    },
    { 
      id: 2, 
      category: 'EDUCATION', 
      title: 'Academic Background', 
      image: utbmLogo, 
      alt: 'UTBM illustration',
      path: '/education'
    },
    { 
      id: 3, 
      category: 'INTEREST', 
      title: 'Passions & Hobbies', 
      image: jsImage, 
      alt: 'JavaScript illustration',
      path: '/interests'
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = cardRefs.current.indexOf(entry.target);
        if (index !== -1) {
          setCardIsVisible(prev => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });
        }
      });
    }, { threshold: 0.2 });

    cardRefs.current.forEach(card => { if(card) observer.observe(card); });
    return () => cardRefs.current.forEach(card => { if(card) observer.unobserve(card); });
  }, []);

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <h2 className="gallery-title">
          <span className="highlight">Gallery</span>
        </h2>
      </div>
      <div className="gallery-container">
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={el => cardRefs.current[index] = el}
            className={`gallery-card ${cardIsVisible[index] ? 'visible' : ''} ${hoveredCard === card.id ? 'hovered' : ''}`}
            style={{ animationDelay: `${index * 0.3}s` }}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleCardClick(card.path)}
          >
            <div className="card-content">
              <span className="card-category">{card.category}</span>
              <h3 className="card-title">{card.title}</h3>
              <div className="card-image-wrapper">
                <img src={card.image} alt={card.alt} className="card-image" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;