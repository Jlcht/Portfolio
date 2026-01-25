// ============================================================================
// PHOTO FRAME COMPONENT (No physics needed)
// ============================================================================

import React, { useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function PhotoFrame({ position, rotation = [0, 0, 0], imageSrc = '/placeholder.jpg', size = [4, 4] }) {
  // Load texture once and cache it - prevents memory leaks
  const texture = useTexture(imageSrc);
  
  // Optimize texture settings
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;  // Efficient filtering
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;         // Disable mipmaps to save memory
      texture.needsUpdate = true;
    }
  }, [texture]);
  
  return (
    <group position={position} rotation={rotation}>
      {/* Outer frame (black border) */}
      <mesh position={[0, 0, -0.03]} receiveShadow>
        <boxGeometry args={[size[0] * 1.35, size[1] * 1.35, 0.1]} />
        <meshBasicMaterial color="#332a1f" />
      </mesh>

      {/* Inner frame border (white/cream mat) */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[size[0] * 1.30, size[1] * 1.30, 0.05]} />
        <meshBasicMaterial color="#fce6cd" />
      </mesh>

      {/* Photo with texture */}
      <mesh position={[0, 0, 0.06]} receiveShadow>
        <planeGeometry args={[size[0], size[1]]} />
        <meshLambertMaterial 
          map={texture}           // Use the cached texture
          toneMapped={false}      // Disable tone mapping for accurate colors
        />
      </mesh>
    </group>
  );
}
