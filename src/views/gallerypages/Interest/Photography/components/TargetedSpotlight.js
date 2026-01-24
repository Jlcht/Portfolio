// ============================================================================
// TARGETED SPOTLIGHT COMPONENT - Spotlight that points at a specific target
// ============================================================================

import React, { useRef, useEffect } from 'react';

export function TargetedSpotlight({ 
  position, 
  targetPosition, 
  intensity = 500, 
  angle = Math.PI / 6,  // 30 degree cone (narrow for focused light)
  penumbra = 0.3,
  color = "#FFFFFF",
  castShadow = true,
  distance = 20,        // Maximum distance the light reaches (prevents bleeding)
  decay = 2             // How quickly light fades (2 = realistic physics)
}) {
  // Create a ref to control the spotlight's target
  const spotlightRef = useRef();
  
  // Set up the spotlight target when component mounts or targetPosition changes
  useEffect(() => {
    if (spotlightRef.current && targetPosition) {
      // Set where the spotlight should point
      spotlightRef.current.target.position.set(
        targetPosition[0], 
        targetPosition[1], 
        targetPosition[2]
      );
      // Update the target's matrix so the change takes effect
      spotlightRef.current.target.updateMatrixWorld();
      
      // Configure shadow properties for better quality
      if (castShadow && spotlightRef.current.shadow) {
        spotlightRef.current.shadow.mapSize.width = 2048;   // Shadow resolution
        spotlightRef.current.shadow.mapSize.height = 2048;  // Higher = better quality
        spotlightRef.current.shadow.camera.near = 0.5;      // Shadow camera near plane
        spotlightRef.current.shadow.camera.far = 50;        // Shadow camera far plane
        spotlightRef.current.shadow.bias = -0.0001;         // Prevents shadow artifacts
      }
    }
  }, [targetPosition, castShadow]);
  
  return (
    <spotLight 
      ref={spotlightRef}
      position={position}
      intensity={intensity}
      angle={angle}
      penumbra={penumbra}
      color={color}
      castShadow={castShadow}
      distance={distance}  // Limit how far light reaches
      decay={decay}        // Realistic light falloff
    />
  );
}
