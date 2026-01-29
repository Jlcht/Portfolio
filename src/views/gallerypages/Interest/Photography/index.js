// ============================================================================
// PHOTOGRAPHY GALLERY - Main Component
// ============================================================================

import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { useProgress } from '@react-three/drei';

// Import components
import { Player } from './components/Player';
import { ExpoScene } from './components/ExpoScene';
import { PointerLockControls } from './components/PointerLockControls';

// Import keyboard utilities
import { handleKeyDown, handleKeyUp } from './utils/keyboard';

function Loader() {
  const { progress } = useProgress();
  return (
    <div style={{
      color: 'white',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      zIndex: 1000
    }}>
      <div style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
        Loading Photo Gallery... {progress.toFixed(0)}%
      </div>
      <div style={{
        width: '300px',
        height: '4px',
        background: '#333',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'white',
          transition: 'width 0.2s ease'
        }} />
      </div>
    </div>
  );
}

export default function Photography() {
  // ========================================
  // SETUP KEYBOARD LISTENERS
  // ========================================
  
  // useEffect runs once when component mounts
  useEffect(() => {
    // Add keyboard event listeners to the entire document
    document.addEventListener('keydown', handleKeyDown);  // Listen for key presses
    document.addEventListener('keyup', handleKeyUp);      // Listen for key releases
    
    // Cleanup function: runs when component unmounts
    return () => {
      // Remove event listeners to prevent memory leaks
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []); // Empty array = run only once on mount
  
  // ========================================
  // RENDER 3D SCENE
  // ========================================
  
  return (
    // Main container - fills entire viewport
    <div style={{ 
      width: '100vw',      // 100% of viewport width
      height: '100vh',     // 100% of viewport height
      position: 'fixed',   // Fixed position (doesn't scroll)
      background: '#111'   // Dark background color
    }}>
      
      {/* Suspense: Shows fallback with progress bar while 3D content loads */}
      <Suspense fallback={<Loader />}>
        
        {/* Canvas: Container for all 3D content */}
        <Canvas 
          shadows  // Enable shadow rendering
          camera={{ 
            position: [-30, 3, 0],  // Starting position: matches Player physics body
            rotation: [0, -Math.PI/8 - Math.PI/8, 0],
            fov: 75                   // Field of view in degrees (wider = more visible)
          }}
        >
          
          {/* PointerLockControls: Enables mouse look (FPS-style camera) */}
          {/* Click the screen to lock the mouse and look around */}
          <PointerLockControls />
          
          {/* ========================================
              PHYSICS WORLD
              ======================================== */}
          
          {/* Physics: Wrapper that creates a physics simulation world */}
          <Physics 
            gravity={[0, 0, 0]}           // No gravity [x, y, z]
                                          // Set to [0, -9.81, 0] for realistic gravity
            
            iterations={10}               // Number of physics iterations per frame
                                          // Higher = more accurate but slower
                                          // 10 is a good balance
            
            tolerance={0.001}             // Collision detection precision
                                          // Lower = more precise but slower
            
            defaultContactMaterial={{     // Default physics material properties
              friction: 0.1,              // How much objects stick together
              restitution: 0              // Bounciness (0 = no bounce)
            }}
          >
            {/* Player: Physics-enabled player controller */}
            <Player />
            
            {/* ExpoScene: The gallery room with physics-enabled walls */}
            <ExpoScene />
          </Physics>
          
        </Canvas>
      </Suspense>
      
    </div>
  );
}
