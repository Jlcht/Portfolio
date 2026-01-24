// ============================================================================
// PHYSICS-ENABLED WALL COMPONENT
// ============================================================================

import React from 'react';
import { useBox } from '@react-three/cannon';

export function PhysicsWall({ position, args, rotation = [0, 0, 0], color = '#aaa' }) {
  // position: [x, y, z] coordinates in 3D space
  // args: [width, height, depth] size of the wall
  // rotation: [x, y, z] rotation in radians
  // color: color of the wall
  
  // ========================================
  // CREATE PHYSICS BODY FOR WALL
  // ========================================
  
  // useBox creates a box-shaped physics body
  const [ref] = useBox(() => ({
    // PHYSICS PROPERTIES:
    type: 'Static',             // Static = doesn't move, infinite mass
                                // Perfect for walls, floors, and immovable objects
    position: position,         // Position in 3D space
    args: args,                 // Size [width, height, depth]
    rotation: rotation          // Rotation in radians
  }));
  // ref: Reference that connects the visual mesh to the physics body
  
  // ========================================
  // RENDER VISUAL MESH
  // ========================================
  
  // The mesh is automatically positioned and rotated by the physics engine
  // We don't need to manually set position/rotation because ref handles it
  return (
    <mesh ref={ref} castShadow receiveShadow>
      {/* boxGeometry: Creates a 3D box shape */}
      <boxGeometry args={args} />
      
      {/* meshLambertMaterial: Surface material that reacts to light */}
      <meshLambertMaterial color={color} />
    </mesh>
  );
}
