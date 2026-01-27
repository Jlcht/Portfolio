import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './InterestGallery.css';
import './CameraCard.css';
import './TravelCard.css';
import Header from '../Header';
import Footer from '../../components/Footer';
import FloatingContactButton from '../../components/FloatingContactButton';
import boxingGlovesImg from '../../assets/images/boxing_gloves.jpg';
import photoGalleryPreview from '../../assets/images/photo_gallery_preview.png';

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
      path: '/interests/boxing',
      stats: ['2+ Years', 'Muay Thai', 'Boxing']
    },
    {
      id: 2,
      title: 'Travel',
      path: '/interests/travel',
    },
    {
      id: 3,
      title: 'Photography',
      path: '/interests/photography',
    }
  ];

  // Tilt effect for Travel card
  const travelCardRef = useRef(null);

  
  const springValues = {
    damping: 30,
    stiffness: 100,
    mass: 2
  };

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
                className={`interest-card ${interest.title === 'Boxing' ? 'vintage-card' : ''} ${interest.title === 'Travel' ? 'travel-card' : ''} ${interest.title === 'Photography' ? 'camera-card' : ''}`}
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
                ) : interest.title === 'Photography' ? (
                  <div className="interest-card-inner camera-interface">
                    {/* Camera viewfinder */}
                    <div className="camera-viewfinder">
                      {/* Top status bar */}
                      <div className="camera-status-bar">
                        <div className="status-left">
                          <span className="status-icon">⚡</span>
                          <span className="status-icon">⏱️</span>
                          <span className="status-icon">Canon IXUS 115</span>
                        </div>
                        <div className="status-right">
                          <span className="status-icon">🎤</span>
                        </div>
                      </div>

                      {/* Left sidebar */}
                      <div className="camera-sidebar-left">
                        <div className="sidebar-icon">4K UHD</div>
                        <div className="sidebar-icon">RAW + JPEG</div>
                        <div className="sidebar-icon">📁</div>
                        <div className="sidebar-icon">⚙️ Settings</div>
                      </div>

                      {/* Main viewfinder area with grid */}
                      <div className="viewfinder-main" style={{
                        backgroundImage: `url(${photoGalleryPreview})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}>
                        {/* Shutter Effect Overlay */}
                        <div className="shutter-flash"></div>

                        {/* Title overlay */}
                        <div className="viewfinder-title-overlay">
                          <h3>Explore the photo gallery</h3>
                        </div>

                        {/* Grid lines */}
                        <div className="grid-overlay">
                          <div className="grid-line-v grid-v1"></div>
                          <div className="grid-line-v grid-v2"></div>
                          <div className="grid-line-h grid-h1"></div>
                          <div className="grid-line-h grid-h2"></div>
                        </div>

                        {/* Focus frame with dashed border */}
                        <div className="focus-frame-dashed">
                          <div className="focus-bracket-solid focus-tl"></div>
                          <div className="focus-bracket-solid focus-tr"></div>
                          <div className="focus-bracket-solid focus-bl"></div>
                          <div className="focus-bracket-solid focus-br"></div>
                          
                          {/* Focus points */}
                          <div className="focus-point focus-point-top"></div>
                          <div className="focus-point focus-point-left"></div>
                          <div className="focus-point focus-point-right"></div>
                          <div className="focus-point focus-point-bottom"></div>
                          
                          {/* Center crosshair */}
                          <div className="focus-crosshair">
                            <div className="crosshair-h"></div>
                            <div className="crosshair-v"></div>
                          </div>
                        </div>
                      </div>

                      {/* Right sidebar */}
                      <div className="camera-sidebar-right">
                        <div style={{fontSize: '0.5rem', writingMode: 'vertical-rl', fontWeight: 700, letterSpacing: '1px'}}>
                          2026-07-27 10:58:46
                        </div>
                        <div style={{fontSize: '0.5rem', writingMode: 'vertical-rl', fontWeight: 700, letterSpacing: '1px'}}>
                          1/4000s
                        </div>
                        <div style={{fontSize: '0.5rem', writingMode: 'vertical-rl', fontWeight: 700, letterSpacing: '1px'}}>
                          f.1.4
                        </div>
                        <div style={{fontSize: '0.5rem', writingMode: 'vertical-rl', fontWeight: 700, letterSpacing: '1px'}}>
                          ISO 100
                        </div>
                        <span className="status-icon">👁️</span>
                        <span className="status-icon">📶</span>
                        <span className="status-badge">M</span>
                      </div>

                      {/* Bottom toolbar */}
                      <div className="camera-toolbar">
                        <div className="toolbar-item">DAYLIGHT</div>
                        <div className="white-balance">
                          <div className="wb-circle"></div>
                        </div>
                        <span className="rec-badge">REC</span>
                        <div className="exposure-slider">
                          <span className="exposure-value">0</span>
                          <div className="slider-track">
                            <div className="slider-marker"></div>
                          </div>
                        </div>
                        <div className="record-button">
                          <div className="record-inner"></div>
                        </div>
                        <span className="status-badge">M</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="interest-card-inner">
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
