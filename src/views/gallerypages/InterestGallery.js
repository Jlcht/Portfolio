import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
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

  // Tilt effect for Travel card
  const travelCardRef = useRef(null);
  const [lastY, setLastY] = useState(0);
  
  const springValues = {
    damping: 30,
    stiffness: 100,
    mass: 2
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  function handleTravelCardMouse(e) {
    if (!travelCardRef.current) return;

    const rect = travelCardRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -14;
    const rotationY = (offsetX / (rect.width / 2)) * 14;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    setLastY(offsetY);
  }

  function handleTravelCardEnter() {
    scale.set(1.05);
  }

  function handleTravelCardLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }


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
                className={`interest-card ${interest.title === 'Boxing' ? 'vintage-card' : ''} ${interest.title === 'Travel' ? 'travel-card' : ''}`}
                onClick={() => navigate(interest.path)}
                style={{ 
                  '--card-color': interest.color,
                  '--card-gradient': interest.gradient,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {interest.title === 'Travel' ? (
                  <motion.div 
                    ref={travelCardRef}
                    className="interest-card-inner"
                    style={{
                      rotateX,
                      rotateY,
                      scale
                    }}
                    onMouseMove={handleTravelCardMouse}
                    onMouseEnter={handleTravelCardEnter}
                    onMouseLeave={handleTravelCardLeave}
                  >
                    <div className="interest-card-glow"></div>
                    
                    {/* Ocean island pattern background */}
                    <div className="travel-ocean-backdrop">
                      <div className="travel-island-backdrop" />
                    </div>
                    <svg height={0} width={0}>
                      <filter id="handDrawnNoise">
                        <feTurbulence result="noise" numOctaves={5} baseFrequency="0.0065" type="fractalNoise" />
                        <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale={900} in2="noise" in="SourceGraphic" />
                      </filter>
                    </svg>
                    
                    <div className="travel-content">
                      <h2 className="interest-title">{interest.title}</h2>
                      <div className="interest-card-footer">
                        <span className="explore-text">Explore</span>
                        <span className="arrow-icon">→</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
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
                )}


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
