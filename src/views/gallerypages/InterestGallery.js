import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InterestGallery.css';
import Header from '../Header';
import Footer from '../../components/Footer';
import FloatingContactButton from '../../components/FloatingContactButton';
import boxingGlovesImg from '../../assets/images/boxing_gloves.jpg';

const InterestGallery = () => {
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const interests = [
    {
      id: 1,
      title: 'Boxing',
      emoji: '⚜',
      description: 'The Greatest of All Time',
      image: boxingGlovesImg,
      color: '#e74c3c',
      gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
      path: '/interests/boxing',
      stats: ['2+ Years', 'Muay Thai', 'Boxing']
    },
    {
      id: 2,
      title: 'Travel',
      emoji: '✈️',
      description: 'Exploring the world, discovering new cultures and creating memories',
      color: '#3498db',
      gradient: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
      path: '/interests/travel',
      stats: ['3 Countries', '6 Cities', '1000+ Photos']
    },
    {
      id: 3,
      title: 'Photography',
      emoji: '📸',
      description: 'Capturing moments and telling stories through the lens',
      color: '#9b59b6',
      gradient: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
      path: '/interests/photography',
      stats: ['5000+ Photos', 'Street Genre', '3+ Years']
    }
  ];

  return (
    <div className="interest-gallery-page">
      <Header />
      <section className="interest-gallery-section">
        <div className="interest-gallery-container">
          <div className="interest-gallery-header">
            <h1 className="interest-gallery-main-title">My Passions & Interests</h1>
            <p className="interest-gallery-subtitle">
              Explore the activities and hobbies that define who I am. Click on any card to dive deeper into each passion.
            </p>
          </div>

          <div className="interests-grid">
            {interests.map((interest, index) => (
              <div 
                key={interest.id}
                className={`interest-card ${interest.title === 'Boxing' ? 'vintage-card' : ''}`}
                onClick={() => navigate(interest.path)}
                style={{ 
                  '--card-color': interest.color,
                  '--card-gradient': interest.gradient,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="interest-card-inner">
                  <div className="interest-card-glow"></div>
                  
                  <div className="interest-card-header">
                    <div className="interest-emoji">{interest.emoji}</div>
                    <h2 className="interest-title">{interest.title}</h2>
                  </div>

                  {interest.image ? (
                    <div className="interest-image-container">
                      <img 
                        src={interest.image} 
                        alt={`${interest.title} illustration`}
                        className="interest-vintage-image"
                      />
                    </div>
                  ) : (
                    <p className="interest-description">{interest.description}</p>
                  )}

                  <div className="interest-stats">
                    {interest.stats.map((stat, idx) => (
                      <div key={idx} className="interest-stat-item">
                        <span className="stat-dot">•</span>
                        <span className="stat-text">{stat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="interest-card-footer">
                    <span className="explore-text">
                      {interest.title === 'Boxing' ? 'Read Chronicle' : 'Explore'}
                    </span>
                    <span className="arrow-icon">→</span>
                  </div>
                </div>

                <div className="interest-card-border"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default InterestGallery;
