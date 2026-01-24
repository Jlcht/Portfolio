// ============================================================================
// PHYSICS-ENABLED FLOOR COMPONENT
// ============================================================================

import React from 'react';
import { useBox } from '@react-three/cannon';

export function PhysicsFloor({ position, args, rotation, color = '#e8e8e8' }) {
  // Similar to PhysicsWall, but optimized for horizontal surfaces
  
  const [ref] = useBox(() => ({
    type: 'Static',             // Floor doesn't move
    position: position,
    args: args,
    rotation: rotation
  }));
  
  return (
    <mesh ref={ref} receiveShadow>
      {/* planeGeometry: Creates a flat rectangular surface */}
      {/* We use a thin box instead of a plane for better physics collision */}
      <boxGeometry args={args} />
      <meshLambertMaterial color={color} />
    </mesh>
  );
}
