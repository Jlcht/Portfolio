import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

// Import travel photos
import bucharestPhoto from '../assets/images/photo/bucarest.jpg';
import istanbulPhoto from '../assets/images/photo/istanbul.jpg';
import budapestPhoto from '../assets/images/photo/budapest.jpg';
import longBeachPhoto from '../assets/images/photo/long_beach.jpg';
import losAngelesPhoto from '../assets/images/photo/los_angeles.jpg';
import londonPhoto from '../assets/images/photo/london.jpg';
import barcelonaPhoto from '../assets/images/photo/barcelona.jpg';
import maltaPhoto from '../assets/images/photo/malta.jpg';

const InteractiveGlobe = () => {
  const globeEl = useRef();
  // Progressive resolution system - Google Earth style
  const [detailLevel, setDetailLevel] = useState('far');
  const [currentAltitude, setCurrentAltitude] = useState(2.5);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [compassRotation, setCompassRotation] = useState(0);

  // Your travel locations with precise coordinates
  const locations = [
    {
      lat: 44.439663,
      lng: 26.096306,
      label: 'Bucharest, Romania',
      description: 'Romanian capital - Palace of Parliament and my erasmus semester location at Politehnica University of Bucharest.',
      details: 'Stayed for 4 months in 2025',
      color: '#200138ff',
      photo: bucharestPhoto
    },
    {
      lat: 47.9029,
      lng: 1.9093,
      label: 'Orléans, France',
      description: 'City of Joan of Arc',
      details: 'Its great, better than Belfort for sure.',
      color: '#ffffffff',
      photo: null
    },
    {
      lat: 47.639999,
      lng: 6.850000,
      label: 'Belfort, France',
      description: 'Eastern France - famous for his Lion of Belfort, my study location at University of Technology of Belfort-Montbéliard.',
      details: 'Stayed for almost 5 years',
      color: '#000000ff',
      photo: null
    },
    {
      lat: 41.015137,
      lng: 28.979530,
      label: 'Istanbul, Turkey',
      description: 'City across two continents - One of my most mind blowing and environment changing travel experience.',
      details: 'Went there in a 11h bus travel from Bucharest through Bulgaria.',
      color: '#4fb9efff',
      photo: istanbulPhoto
    },
    {
      lat: 47.497913,
      lng: 19.040236,
      label: 'Budapest, Hungary',
      description: 'Pearl of the Danube - Crazy beautiful city with those original "Ruin Bar".',
      details: 'Went there with my friends for a week, a must do in Europe.',
      color: '#efd269ff',
      photo: budapestPhoto
    },
    {
      lat: 33.770050,
      lng: -118.193741,
      label: 'Long Beach, California',
      description: 'Pacific Coast - A huge vietnamese community that made me feel like i was somewhere between Asia and America.',
      details: 'Unmatched vibes',
      color: '#74d2e2ff',
      photo: longBeachPhoto
    },
    {
      lat: 34.052235,
      lng: -118.243683,
      label: 'Los Angeles, California',
      description: 'City of Angels - Hollywood, what can i say more ?',
      details: 'GTA 5 map for sure',
      color: '#292bcfff',
      photo: losAngelesPhoto
    },
    {
      lat: 51.509865,
      lng: -0.118092,
      label: 'London, United Kingdom',
      description: 'British capital - A school trip where we stayed with a host family.',
      details: 'One of my most memorable trip due to the atmosphere with all my friends.',
      color: '#cae0ecff',
      photo: londonPhoto
    },
    {
      lat: 41.390205,
      lng: 2.154007,
      label: 'Barcelona, Spain',
      description: 'Catalan jewel - Sagrada Familia, i understand now why people fall in love with this city.',
      details: 'I could live there.',
      color: '#F8B739',
      photo: barcelonaPhoto
    },
    {
      lat: 35.917973,
      lng: 14.409943,
      label: 'Malta',
      description: 'Mediterranean island - A pearl in the middle of the sea. Crazy island with even more crazy people.',
      details: 'Beautiful beaches and crystal clear water. But i got badly sick.',
      color: '#53f5dcff',
      photo: maltaPhoto
    }
  ];

  // Calculate distance between two points (Haversine formula simplified)
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return c; // Returns distance in radians (0 to π)
  };

  const travelArcs = [
    { start: [1.9093, 47.9029], end: [26.096306, 44.439663] }, // Orléans to Bucharest
    { start: [1.9093, 47.9029], end: [6.850000, 47.639999] }, // Orléans to Belfort
    { start: [26.096306, 44.439663], end: [28.979530, 41.015137] }, // Bucharest to Istanbul
    { start: [26.096306, 44.439663], end: [19.040236, 47.497913] }, // Bucharest to Budapest
    { start: [1.9093, 47.9029], end: [-118.243683, 34.052235] }, // Orleans to Los Angeles
    { start: [-118.243683, 34.052235], end: [-118.193741, 33.770050] }, // Long Beach to Los Angeles
    { start: [1.9093, 47.9029], end: [-0.118092, 51.509865] }, // Orléans to London
    { start: [1.9093, 47.9029], end: [2.154007, 41.390205] }, // Orléans to Barcelona
    { start: [1.9093, 47.9029], end: [14.409943, 35.917973] } // Orléans to Malta
  ].map(arc => {
    const distance = calculateDistance(
      arc.start[1], arc.start[0],
      arc.end[1], arc.end[0]
    );
    // Scale altitude based on distance (0.1 to 0.5)
    const altitude = Math.min(0.1 + (distance / Math.PI) * 0.4, 0.5);
    
    return {
      startLat: arc.start[1],
      startLng: arc.start[0],
      endLat: arc.end[1],
      endLng: arc.end[0],
      color: ['rgba(78, 205, 196, 0.8)', 'rgba(255, 107, 107, 0.8)'],
      altitude: altitude
    };
  });

  // Function to determine detail level based on altitude
  const getDetailLevel = (altitude) => {
    if (altitude > 3.0) return 'veryFar';      // Very zoomed out
    if (altitude > 2.0) return 'far';          // Default view
    if (altitude > 1.0) return 'medium';       // Medium zoom
    return 'close';                             // Very close zoom
  };

  // Initial setup - runs only once
  useEffect(() => {
    if (globeEl.current) {
      // Auto-rotate enabled - works with solid arcs
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3;
      globeEl.current.controls().enableZoom = true;
      
      // Set zoom limits for better control
      globeEl.current.controls().minDistance = 101; // Closest zoom (altitude ~0.01)
      globeEl.current.controls().maxDistance = 600; // Farthest zoom (altitude ~5)
      
      // Initial camera position
      globeEl.current.pointOfView({ lat: 45, lng: 10, altitude: 2.5 }, 1000);
    }
  }, []); // Empty dependency array - runs once on mount

  // Auto-rotation pause/resume on interaction
  useEffect(() => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      let inactivityTimer = null;

      const handleInteractionStart = () => {
        controls.autoRotate = false;
        if (inactivityTimer) {
          clearTimeout(inactivityTimer);
        }
      };

      const handleInteractionEnd = () => {
        if (inactivityTimer) {
          clearTimeout(inactivityTimer);
        }
        inactivityTimer = setTimeout(() => {
          controls.autoRotate = true;
        }, 5000);
      };

      controls.addEventListener('start', handleInteractionStart);
      controls.addEventListener('end', handleInteractionEnd);

      return () => {
        controls.removeEventListener('start', handleInteractionStart);
        controls.removeEventListener('end', handleInteractionEnd);
        if (inactivityTimer) {
          clearTimeout(inactivityTimer);
        }
      };
    }
  }, []);

  // Monitor zoom level to switch textures progressively
  useEffect(() => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      
      const handleChange = () => {
        if (globeEl.current) {
          const pov = globeEl.current.pointOfView();
          const altitude = pov.altitude;
          setCurrentAltitude(altitude);
          
          // Update compass rotation based on globe's longitude
          if (pov.lng !== undefined) {
            setCompassRotation(-pov.lng);
          }
          
          const newDetailLevel = getDetailLevel(altitude);
          
          // Only update if detail level actually changed
          if (newDetailLevel !== detailLevel) {
            setDetailLevel(newDetailLevel);
            console.log(`🌍 Switching to ${newDetailLevel} detail (altitude: ${altitude.toFixed(2)})`);
          }
        }
      };
      
      controls.addEventListener('change', handleChange);
      
      // Cleanup listener on unmount
      return () => {
        controls.removeEventListener('change', handleChange);
      };
    }
  }, [detailLevel]);

  // Progressive texture configuration - Google Earth style
  const getTextureConfig = () => {
    switch (detailLevel) {
      case 'veryFar':
        // Very far view - simplified, fast loading
        return {
          globe: '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
          bump: null, // No bump map for performance
          showAtmosphere: true,
          atmosphereColor: '#1a3a5c',
          atmosphereAltitude: 0.3,
          label: '🌌 Space View',
          description: 'Low detail for performance'
        };
      
      case 'far':
        // Default view - balanced
        return {
          globe: '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
          bump: '//unpkg.com/three-globe/example/img/earth-topology.png',
          showAtmosphere: true,
          atmosphereColor: '#1a3a5c',
          atmosphereAltitude: 0.25,
          label: '🌍 Global View',
          description: 'Standard resolution'
        };
      
      case 'medium':
        // Medium zoom - more detail
        return {
          globe: '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
          bump: '//unpkg.com/three-globe/example/img/earth-topology.png',
          showAtmosphere: true,
          atmosphereColor: '#3a8ad4',
          atmosphereAltitude: 0.2,
          label: '🗺️ Regional View',
          description: 'Enhanced detail'
        };
      
      case 'close':
        // Close zoom - maximum detail
        return {
          globe: '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
          bump: '//unpkg.com/three-globe/example/img/earth-topology.png',
          showAtmosphere: true,
          atmosphereColor: '#3a8ad4',
          atmosphereAltitude: 0.15,
          label: '🔍 Detailed View',
          description: 'Maximum resolution'
        };
      
      default:
        return getTextureConfig.call(this, 'far');
    }
  };

  const textureConfig = getTextureConfig();

  return (
    <div style={{ width: '100%', height: '100vh', background: '#000' }}>
      <Globe
        ref={globeEl}
        globeImageUrl={textureConfig.globe}
        bumpImageUrl={textureConfig.bump}
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        // Atmosphere effect
        showAtmosphere={textureConfig.showAtmosphere}
        atmosphereColor={textureConfig.atmosphereColor}
        atmosphereAltitude={textureConfig.atmosphereAltitude}
        
        // Location markers - interactive and clickable
        pointsData={locations}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.02}
        pointRadius={1.0}
        
        // Hover effect for better UX
        onPointHover={(point) => {
          if (point) {
            document.body.style.cursor = 'pointer';
          } else {
            document.body.style.cursor = 'auto';
          }
        }}
        
        // Enhanced click interaction with zoom and card display
        onPointClick={(point) => {
          if (point) {
            console.log('Visiting:', point.label);
            setSelectedLocation(point);
            // Zoom in close to the location
            if (globeEl.current) {
              globeEl.current.pointOfView(
                { lat: point.lat, lng: point.lng, altitude: 0.8 },
                2000
              );
            }
          }
        }}
        
        // Travel routes - solid arcs (no animation conflicts)
        arcsData={travelArcs}
        arcColor={(d) => d.color}
        arcDashLength={1}
        arcDashGap={0}
        arcDashAnimateTime={0}
        arcStroke={0.5}
        arcAltitude={(d) => d.altitude}
        arcCircularResolution={64}
        arcsTransitionDuration={0}
      />

      {/* Compass button - rotates with globe like Google Earth */}
      <div
        onClick={() => {
          if (globeEl.current) {
            const currentPov = globeEl.current.pointOfView();
            // Reset to "straight" - north pointing up, centered on Orléans
            globeEl.current.pointOfView({ 
              lat: 47.9029, // Orléans latitude
              lng: 0, 
              altitude: currentPov.altitude 
            }, 800);
            setSelectedLocation(null);
          }
        }}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '70px',
          height: '70px',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          zIndex: 100
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        title="Reset globe position"
      >
        <svg viewBox="0 0 100 100" width="70" height="70">
          {/* Outer ring */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="rgba(0, 0, 0, 0.8)"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="2"
          />
          
          {/* Cardinal direction markers */}
          <g stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2">
            <line x1="50" y1="5" x2="50" y2="15" />
            <line x1="95" y1="50" x2="85" y2="50" />
            <line x1="50" y1="95" x2="50" y2="85" />
            <line x1="5" y1="50" x2="15" y2="50" />
          </g>
          
          {/* N marker */}
          <text
            x="50"
            y="20"
            textAnchor="middle"
            fill="rgba(255, 255, 255, 0.9)"
            fontSize="12"
            fontWeight="bold"
            fontFamily="Arial"
          >
            N
          </text>
          
          {/* Rotating compass needle */}
          <g transform={`rotate(${compassRotation}, 50, 50)`} style={{ transition: 'transform 0.1s linear' }}>
            {/* North pointer (red) */}
            <path
              d="M 50 20 L 45 50 L 50 45 L 55 50 Z"
              fill="#FF4444"
              stroke="#CC0000"
              strokeWidth="1"
            />
            {/* South pointer (white) */}
            <path
              d="M 50 80 L 45 50 L 50 55 L 55 50 Z"
              fill="#FFFFFF"
              stroke="#CCCCCC"
              strokeWidth="1"
            />
            {/* Center dot */}
            <circle
              cx="50"
              cy="50"
              r="4"
              fill="#FFD700"
              stroke="#FFA500"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>

      {/* Location card - appears when pin is clicked */}
      {selectedLocation && (
        <div style={{
          position: 'absolute',
          top: '100px',
          left: '20px',
          width: '280px',
          background: 'rgba(4, 0, 0, 0.95)',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          animation: 'fadeIn 0.3s ease-in',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Close button */}
          <button
            onClick={() => setSelectedLocation(null)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: 'white',
              padding: '5px',
              lineHeight: '1'
            }}
          >
            ×
          </button>

          {/* Photo */}
          {selectedLocation.photo && (
            <div style={{
              width: '100%',
              height: '160px',
              marginBottom: '16px',
              borderRadius: '6px',
              overflow: 'hidden'
            }}>
              <img 
                src={selectedLocation.photo} 
                alt={selectedLocation.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}

          {/* Location details */}
          <div style={{
            borderLeft: `4px solid ${selectedLocation.color}`,
            paddingLeft: '12px'
          }}>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white'
            }}>
              {selectedLocation.label}
            </h3>
            
            <p style={{
              margin: '0 0 8px 0',
              fontSize: '14px',
              color: 'white',
              lineHeight: '1.5'
            }}>
              {selectedLocation.description}
            </p>
            
            <p style={{
              margin: 0,
              fontSize: '12px',
              color: 'white',
              fontStyle: 'italic'
            }}>
              {selectedLocation.details}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveGlobe;
