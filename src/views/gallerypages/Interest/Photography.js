import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import './Photography.css';
import Header from '../../Header';
import Footer from '../../../components/Footer';
import FloatingContactButton from '../../../components/FloatingContactButton';

// Import photography images
import photoStreet from '../../../assets/images/photo_street_1.png';
import photoLandscape from '../../../assets/images/photo_landscape_1.png';
import photoPortrait from '../../../assets/images/photo_portrait_1.png';
import photoArchitecture from '../../../assets/images/photo_architecture_1.png';

// 3D Camera Component
const Camera3D = ({ currentPhoto, onShutterClick, isShutterPressed }) => {
  return (
    <group>
      {/* Camera Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 1.5, 0.8]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Camera Front Plate */}
      <mesh position={[0, 0, 0.41]}>
        <boxGeometry args={[2.5, 1.5, 0.02]} />
        <meshStandardMaterial color="#34495e" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Lens */}
      <mesh position={[0.6, 0.2, 0.6]}>
        <cylinderGeometry args={[0.35, 0.35, 0.4, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Lens Glass */}
      <mesh position={[0.6, 0.2, 0.81]}>
        <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0.1} transparent opacity={0.9} />
      </mesh>

      {/* Lens Ring */}
      <mesh position={[0.6, 0.2, 0.7]}>
        <torusGeometry args={[0.36, 0.03, 16, 32]} />
        <meshStandardMaterial color="#95a5a6" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Flash */}
      <mesh position={[-0.8, 0.5, 0.45]}>
        <boxGeometry args={[0.3, 0.15, 0.1]} />
        <meshStandardMaterial color="#ecf0f1" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>

      {/* LCD Screen */}
      <mesh position={[0, 0, -0.41]}>
        <boxGeometry args={[1.8, 1.2, 0.02]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* LCD Display with Photo */}
      {currentPhoto && (
        <Html position={[0, 0, -0.4]} transform occlude>
          <div className="camera-lcd-screen">
            <img src={currentPhoto.image} alt={currentPhoto.title} className="lcd-photo" />
            <div className="lcd-info">
              <span className="lcd-title">{currentPhoto.title}</span>
              <span className="lcd-location">{currentPhoto.location}</span>
            </div>
          </div>
        </Html>
      )}

      {/* Shutter Button */}
      <mesh 
        position={[1.1, 0.6, 0.2]} 
        onClick={onShutterClick}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
      >
        <cylinderGeometry args={[0.12, 0.12, isShutterPressed ? 0.05 : 0.1, 16]} />
        <meshStandardMaterial color="#e74c3c" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Mode Dial */}
      <mesh position={[-1, 0.6, 0.2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.08, 16]} />
        <meshStandardMaterial color="#7f8c8d" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Canon Logo */}
      <Html position={[-0.8, -0.4, 0.42]} transform>
        <div className="camera-logo">CANON</div>
      </Html>

      {/* Model Name */}
      <Html position={[0.3, -0.5, 0.42]} transform>
        <div className="camera-model">IXUS 115 HS</div>
      </Html>
    </group>
  );
};

const Photography = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isShutterPressed, setIsShutterPressed] = useState(false);

  // Photography gallery
  const photoGallery = [
    { id: 1, image: photoStreet, title: 'Street Photography', location: 'Urban Scene' },
    { id: 2, image: photoLandscape, title: 'Landscape', location: 'Coastal Beauty' },
    { id: 3, image: photoPortrait, title: 'Portrait', location: 'Emotional Moment' },
    { id: 4, image: photoArchitecture, title: 'Architecture', location: 'Modern Design' },
  ];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="photography-page">
      <Header />
      <section className="photography-section">
        <div className="photography-container">
          <div className="photography-page-header">
            <h1 className="photography-main-title">📸 Photography</h1>
            <p className="photography-subtitle">Capturing moments, telling stories through the lens</p>
          </div>

          {/* PHOTOGRAPHY SECTION - 3D Camera */}
          <div className="photography-3d-section">
            <div className="photography-header">
              <h2 className="photography-title">My Camera</h2>
              <p className="photography-subtitle">Explore my Canon IXUS 115 HS and the moments I've captured</p>
            </div>

            <div className="camera-3d-container">
              <div className="camera-canvas-wrapper">
                <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
                  <PerspectiveCamera makeDefault position={[0, 2, 5]} />
                  <OrbitControls 
                    enableZoom={true}
                    enablePan={true}
                    minDistance={3}
                    maxDistance={10}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                  />
                  
                  {/* Lighting */}
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                  <pointLight position={[-5, 5, -5]} intensity={0.5} />
                  <spotLight position={[0, 10, 0]} intensity={0.3} />
                  
                  {/* Camera Model */}
                  <Camera3D 
                    currentPhoto={photoGallery[currentPhotoIndex]}
                    onShutterClick={() => {
                      setIsShutterPressed(true);
                      setTimeout(() => setIsShutterPressed(false), 200);
                      setCurrentPhotoIndex((prev) => (prev + 1) % photoGallery.length);
                    }}
                    isShutterPressed={isShutterPressed}
                  />
                  
                  {/* Ground plane */}
                  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.8} />
                  </mesh>
                </Canvas>

                <div className="camera-controls-hint">
                  <p>🖱️ Drag to rotate • Scroll to zoom • Click shutter button to change photo</p>
                </div>
              </div>

              <div className="camera-info-panel">
                <h3>Canon IXUS 115 HS</h3>
                <p className="camera-description">
                  My trusty companion for capturing life's moments. This compact camera has been with me through countless adventures, 
                  from street photography to landscape shots.
                </p>

                <div className="camera-specs">
                  <div className="spec-item">
                    <span className="spec-icon">📷</span>
                    <div className="spec-content">
                      <span className="spec-label">Sensor</span>
                      <span className="spec-value">12.1 MP</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon">🔍</span>
                    <div className="spec-content">
                      <span className="spec-label">Zoom</span>
                      <span className="spec-value">4x Optical</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon">📺</span>
                    <div className="spec-content">
                      <span className="spec-label">LCD</span>
                      <span className="spec-value">3.0" Screen</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon">🎥</span>
                    <div className="spec-content">
                      <span className="spec-label">Video</span>
                      <span className="spec-value">1080p HD</span>
                    </div>
                  </div>
                </div>

                <div className="photography-stats">
                  <div className="photo-stat">
                    <div className="stat-number">5000+</div>
                    <div className="stat-label">Photos Taken</div>
                  </div>
                  <div className="photo-stat">
                    <div className="stat-number">Street</div>
                    <div className="stat-label">Favorite Genre</div>
                  </div>
                  <div className="photo-stat">
                    <div className="stat-number">3+</div>
                    <div className="stat-label">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="photography-gallery-preview">
              <h3>Featured Photos</h3>
              <div className="gallery-grid">
                {photoGallery.map((photo, index) => (
                  <div 
                    key={photo.id} 
                    className={`gallery-item ${index === currentPhotoIndex ? 'active' : ''}`}
                    onClick={() => setCurrentPhotoIndex(index)}
                  >
                    <img src={photo.image} alt={photo.title} />
                    <div className="gallery-overlay">
                      <span className="gallery-title">{photo.title}</span>
                      <span className="gallery-location">{photo.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="photography-quote">
              <p>"Photography is the story I fail to put into words."</p>
              <span className="quote-author">- Destin Sparks</span>
            </div>
          </div>

        </div>
      </section>
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default Photography;
