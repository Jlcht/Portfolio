import React from 'react';
import './Gallery.css';
import codeImage from '../assets/images/code_illu.jpg';
import htmlImage from '../assets/images/html_illu.jpg';
import jsImage from '../assets/images/js_illu.jpg';
import utbmLogo from '../assets/images/utbm_logo.jpg';


const Gallery = () => {
  const [hoveredCard, setHoveredCard] = React.useState(null);

  const cards = [
    {
      id: 1,
      category: 'PROFESSIONAL EXPERIENCE',
      title: 'Professional Journey',
      image: codeImage,
      alt: 'Code illustration',
      display: true
    },
    {
      id: 2,
      category: 'EDUCATION',
      title: 'Academic Background',
      image: utbmLogo,
      alt: 'UTBM illustration',
      display: true
    },
    {
      id: 3,
      category: 'INTEREST',
      title: 'Passions & Hobbies',
      image: jsImage,
      alt: 'JavaScript illustration',
      display: true
    }
  ];

  const visibleCards = cards.filter((card) => card.display);

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <h2 className="gallery-title">
          Discover me in <span className="highlight">3 differents ways.</span> 
        </h2>
      </div>
      <div className="gallery-container">
        {visibleCards.map((card) => (
          <div 
            key={card.id} 
            className={`gallery-card ${hoveredCard === card.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-content">
              <span className="card-category">{card.category}</span>
              <h3 className="card-title">{card.title}</h3>
              <div className="card-image-wrapper">
                <img 
                  src={card.image}
                  alt={card.alt}
                  className="card-image"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;