import React from 'react';
import './Gallery.css';
import codeImage from '../assets/images/code_illu.jpg';
import htmlImage from '../assets/images/html_illu.jpg';
import jsImage from '../assets/images/js_illu.jpg';

const Gallery = () => {
  const [hoveredCard, setHoveredCard] = React.useState(null);

  const cards = [
    {
      id: 1,
      category: 'DEVELOPMENT',
      title: 'Master the art of clean code',
      image: codeImage,
      alt: 'Code illustration'
    },
    {
      id: 2,
      category: 'WEB DESIGN',
      title: 'Build responsive layouts with modern HTML',
      image: htmlImage,
      alt: 'HTML illustration'
    },
    {
      id: 3,
      category: 'JAVASCRIPT',
      title: 'Create dynamic experiences with JS',
      image: jsImage,
      alt: 'JavaScript illustration'
    }
  ];

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <h2 className="gallery-title">
          Remises et <span className="highlight">offres.</span> Promotions exclusives, programmes spéciaux, et plus.
        </h2>
      </div>
      <div className="gallery-container">
        {cards.map((card) => (
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