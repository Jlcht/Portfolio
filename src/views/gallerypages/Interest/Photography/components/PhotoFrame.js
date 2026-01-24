// ============================================================================
// PHOTO FRAME COMPONENT (No physics needed)
// ============================================================================

import React from 'react';
import * as THREE from 'three';

export function PhotoFrame({ position, rotation = [0, 0, 0], imageSrc = '/placeholder.jpg', size = [4, 4] }) {
  // Photo frames don't need physics because we don't collide with them
  // They're just visual decorations
  
  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      {/* planeGeometry: Creates a flat rectangular surface for the photo */}
      <planeGeometry args={size} />
      
      {/* meshLambertMaterial: Surface material with image texture */}
      <meshLambertMaterial 
        map={new THREE.TextureLoader().load(imageSrc)}  // Load image as texture
        toneMapped={false}  // Disable tone mapping for accurate colors
      />
    </mesh>
  );
}
